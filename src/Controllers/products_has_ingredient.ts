import { Response, Request } from 'express';
import { postProduct } from '../Database/product';
import { createCustomProducts, createOfficialProducts } from '../Database/product_has_ingredient';



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
                case true:
                    createCustomProducts(product);
                    break;
                case false:
                    createOfficialProducts(product);
                    break;
            }
            
        })
    } catch (error) {
        console.log('there is an error');
        
    }
}