import { Response, Request } from 'express';
import { getProductById, postProduct } from '../Database/product';
import { createCustomProducts, createOfficialProducts, getIngredientOfOffialProductById } from '../Database/product_has_ingredient';
import { Product_has_Ingredient } from '../models/Product_has_Ingredient';



export async function productHasIngredientControllerPost(req: Request, res: Response) {
    const productAndIngredientData = req.body;
    if (!Array.isArray(productAndIngredientData)) {
        throw new Error('not array');  
    }
    
    try {
        
        productAndIngredientData.forEach(async postedData => {

            const custom = postedData.product.custom;
            const product = postedData;

            switch (custom){
                case false:
                    try {
                        const preoductCreate = await createOfficialProducts(product);
                        if (preoductCreate === 'no ingredient correspond') {
                            return res.status(404).json({
                                status: 404,
                                response: 'no ingredient correspond'
                            })
                        } 
                    } catch (error) {
                        console.log(error);
                    }
                break;
            }
            
            return res.status(200).json({
                status: 200,
                response: 'The product have been created and linked to the given ingredients'
            })
        })
    } catch (error) {
        console.log('there is an error');
        
    }
}


export async function productHasIngredientGet(req: Request, res: Response) {
    const productId = parseInt(req.params.id, 10)
    const ingredients = []

    let responseData = {}

    try {
        const dataOfProduct = await getProductById(productId)
        
        const ingredientOfProduct = await getIngredientOfOffialProductById(productId)
        
        for await (const { ingredient } of ingredientOfProduct) {
            ingredients.push(ingredient)
        }


        responseData['product'] = dataOfProduct[0]
        responseData['ingredients'] = ingredients

        res.status(200).json({
            status: 200,
            response: responseData
        })

    } catch (error) {
        res.status(400).json({
            status: 400,
            response: 'An Error happend'
        })
        
    }
}