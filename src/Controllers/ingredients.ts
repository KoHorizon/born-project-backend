import { Response, Request } from 'express';
import { getExcludeIngredientOfOrder } from '../Database/exclude_ingredient_for_order';
import { createIngredient, getIngredientAll, getIngredientOfProductById, substractIngredientStock } from '../Database/ingredient';
import { getIdOfOrderHasProduct, getOrderProducts } from '../Database/order_has_products';
import { getIngredientOfCustomProduct } from '../Database/product_has_ingredient';
import { Order } from '../models/Order';



export async function ingredientControllerPost(req: Request, res: Response) {
    try {
        
        const value = req.body
        await createIngredient(value);
        return res.status(200).json({
            status: 200,
            response: 'Ingredient created'
        });
    } catch (error) {
        switch (error.message) {
            case 'not array':
                return res.status(400).json({
                    status:'error',
                    response: 'Not an array'
                });
                break;
            case 'wrong format':
                return res.status(400).json({
                    status:'error',
                    response: 'Wrong format given'
                });
                break;
        };
    }
}

export async function ingredientControllerGet(req: Request, res: Response) {
    try {
        const ingredient = await getIngredientAll();
        return res.status(200).json({
            status: 200,
            ingredient: ingredient
        })
    } catch (error) {
        return res.status(404).json({
            status: 404,
            response: 'ingredient not found'
        });
    }
}


export async function getIngredientOfOrder(order: Order) {
    // -------------------------- Get id's of Excluded Product
    const idOfOrderHasProduct = []
    const getIdOfOrders = await getIdOfOrderHasProduct(order)

    for await(const {order_h_product_id} of getIdOfOrders) {
        idOfOrderHasProduct.push(order_h_product_id)
    }


    const idOfExcludedIngredient = []
    const customIngredientId = []

    const getExcludeIngredient = await getExcludeIngredientOfOrder(idOfOrderHasProduct)
    for await (const {ingredientid} of getExcludeIngredient) {  // substract price of all the excluded ingredient on official Product
            idOfExcludedIngredient.push(ingredientid)
    }    

    // -------------------------- Get Product of Orders


    const productOfOrder = await getOrderProducts(order);

    const idOfOProduct = []

    for await (const product of productOfOrder) {  // addition price of official Product and Custom Product
        if (product.productid != null) {
            idOfOProduct.push(product.productid)
        } 

        if (product.productcustomid != null) {
            const ingredientIdOfCustomProduct = await getIngredientOfCustomProduct(product.productcustomid)

            for await (const { ingredientid } of ingredientIdOfCustomProduct) {
                customIngredientId.push(ingredientid)
            }
            
        }
    }


    const ingredientIdOfOrderedProduct = []
    for await (const id of idOfOProduct) {
        const ingredientOfProouct = await getIngredientOfProductById(id)

        for await (const { ingredientid } of ingredientOfProouct) {
            ingredientIdOfOrderedProduct.push(ingredientid)
        }
        
    }

    for (let i = 0; i < idOfExcludedIngredient.length; i++) {
        for (let j = 0; j < ingredientIdOfOrderedProduct.length; j++) {
            if (idOfExcludedIngredient[i] == ingredientIdOfOrderedProduct[j]) {
                ingredientIdOfOrderedProduct.splice(j, 1)
                break;
            }
        }
    }
    const idThatContainsIdOfIngredientToSubstract = [...ingredientIdOfOrderedProduct,...customIngredientId]
    substractIngredientStock(idThatContainsIdOfIngredientToSubstract);

}