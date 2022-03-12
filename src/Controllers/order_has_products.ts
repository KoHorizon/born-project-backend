import { Response, Request } from 'express';
import { getCustomProductPrice } from '../Database/customProduct';
import { getExcludeIngredientOfOrder } from '../Database/exclude_ingredient_for_order';
import { getPriceOfIngredient } from '../Database/ingredient';
import { createInvoice } from '../Database/invoice';
import createOrder from '../Database/order';
import { createOrderHasProductCustom, createOrderHasProductOfficial, getIdOfOrderHasProduct, getOrderProducts } from '../Database/order_has_products';
import { getOfficialProductPrice } from '../Database/product';
import { createCustomProducts } from '../Database/product_has_ingredient';
import { Order } from '../models/Order';
import { excludeIngredient } from './exclude_ingredient_for_order';
import { getIngredientOfOrder } from './ingredients';


export async function orderHasProductPost(req: Request, res: Response) {
    const productAndIngredientData = req.body;
    
    if (!Array.isArray(productAndIngredientData)) {
        throw new Error('not array');  
    }  
    try {

        const email = productAndIngredientData[0].email;
        const createdOrder = await createOrder(email); // create order here

        for await (const postedData of productAndIngredientData) {
            const custom = postedData.product.custom;
            const product = postedData;
            
            if (custom === true) {
                if (!postedData.ingredients.length) {
                    return res.status(400).json({
                        status: 200,
                        response: 'no ingredient given'
                    })
                }
                const createCustomProduct = await createCustomProducts(product);
                const createdOrderHasProductCustom = await createOrderHasProductCustom(createdOrder, createCustomProduct); // create order has custom product here                
            } else {
                const createdOrderHasProductOfficial = await createOrderHasProductOfficial(createdOrder, product.product); // create order has official product here             
                const excludedProduct = await excludeIngredient(product.exclude_ingredients, product, createdOrderHasProductOfficial)
                
            }
        }
        // create function to createInvoice
        const priceOfOrder = await orderHasPrice(createdOrder);
        const invoiceCreation = await createInvoice(priceOfOrder, createdOrder);
        const ingredientOfOrder = await getIngredientOfOrder(createdOrder);        

        res.status(200).json({
            status: 200,
            response: 'Order and Invoice have benn created',
            invoice: invoiceCreation
        })
    } catch (error) {
        throw error;
    }

}



export async function orderHasPrice(order: Order) {
    const idOfOrderHasProduct = []
    const getIdOfOrders = await getIdOfOrderHasProduct(order)

    for await(const {order_h_product_id} of getIdOfOrders) {
        idOfOrderHasProduct.push(order_h_product_id)
    }
    const getExcludeIngredient = await getExcludeIngredientOfOrder(idOfOrderHasProduct)

    const productOfOrder = await getOrderProducts(order);
    let price = 0;

    for await (const product of productOfOrder) {  // addition price of official Product and Custom Product
        
        if (product.productid != null) {
            const priceOfOfficialProduct = await getOfficialProductPrice(product.productid)
            
            for (const {product_price} of priceOfOfficialProduct) {
                price += parseFloat(product_price);
            }
        } 
        if (product.productcustomid != null) {
            const priceCustomProduct = await getCustomProductPrice(product.productcustomid)
            price += priceCustomProduct
        }

    }

    for await (const {ingredientid} of getExcludeIngredient) {  // substract price of all the excluded ingredient on official Product
        const priceOfIngredient = await getPriceOfIngredient(ingredientid);
        price -= parseFloat(priceOfIngredient[0].ingredient_price);
    }    
    
    return price;
}