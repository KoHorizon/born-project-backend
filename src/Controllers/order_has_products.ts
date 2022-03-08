import { Response, Request } from 'express';
import createOrder from '../Database/order';
import { createOrderHasProductCustom, createOrderHasProductOfficial } from '../Database/order_has_products';
import { getProdudct } from '../Database/product';
import { createCustomProducts } from '../Database/product_has_ingredient';


export async function orderHasProductPost(req: Request, res: Response) {
    const productAndIngredientData = req.body;

    if (!Array.isArray(productAndIngredientData)) {
        throw new Error('not array');  
    }  
    try {

        const email = productAndIngredientData[0].email;
        const createdOrder = await createOrder(email); // create order here

        productAndIngredientData.forEach(async postedData => { // forEach in given data of order products
            const custom = postedData.product.custom;
            const product = postedData;
            
            if (custom === true) {
                if (!postedData.ingredients.length) {
                    return res.status(400).json({
                        status: 200,
                        response: 'no ingredient given'
                    })
                }
                const createCustProduct = await createCustomProducts(product);

                const createdOrderHasProductCustom = await createOrderHasProductCustom(createdOrder, createCustProduct); // create order has custom product here

            } else {
                const createdOrderHasProductOfficial = await createOrderHasProductOfficial(createdOrder, product.product); // create order has official product here             
            }
            
            // create function to createInvoice

        })
    } catch (error) {
        throw error;
    }

}