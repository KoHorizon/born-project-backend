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