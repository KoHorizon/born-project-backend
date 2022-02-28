import { Product } from "../models/Product";
import { Product_has_Ingredient } from "../models/Product_has_Ingredient";
import {getRepository} from "typeorm";
import { Ingredient } from "../models/Ingredient";

export async function getProduct() {
    
    let idOfUnavailableIngredient = []
    let idOfUnavailableProduct = []
    let idOfAvailableProduct = []



    const ingredientUnavailable = await getRepository(Ingredient) // Get every ingredient that have 0 stocl
        .createQueryBuilder( "ingredient")
        .select(['ingredient.id'])
        .where("ingredient.stock = 0")
        .getMany();        
    

    if (Array.isArray(ingredientUnavailable) && ingredientUnavailable.length == 0 ) {  // check if array is empty
        const allProductAvailable = await getRepository(Product_has_Ingredient) // get all product
            .createQueryBuilder('product')
            .select(['product.productId'])
            .getRawMany();

        if ( allProductAvailable ) {    // stock id's of available product without duplicate
            allProductAvailable.forEach((e) => { 
                idOfAvailableProduct.push(e.productId);
            })
            idOfAvailableProduct = [...new Set(idOfAvailableProduct)]
        };
        

        const productAvailable = await getRepository(Product)   // get products in product database with array containing the searched id
            .createQueryBuilder()
            .where('id IN(:id)', {id: idOfAvailableProduct})
            .getRawMany();
            
        return productAvailable;
    }


    if ( ingredientUnavailable ) {  // stock unavailable ingredient id's
        ingredientUnavailable.forEach((e) => idOfUnavailableIngredient.push(e.id))
    };

    const productUnavailableId = await getRepository(Product_has_Ingredient) // get the unavailable product with stock id's
        .createQueryBuilder('product')
        .select(['product.productId'])
        .where('ingredientId IN(:id)', {id: idOfUnavailableIngredient})
        .getRawMany();

    
    if ( productUnavailableId ) {   // stock id's of unavailable product without duplicate
        productUnavailableId.forEach((e) => { 
            idOfUnavailableProduct.push(e.productId);
        })
        idOfUnavailableProduct = [...new Set(idOfUnavailableProduct)]
    };
    
    
    const productAvailableData = await getRepository(Product_has_Ingredient)    // search every product that don't match the unavailable id's, this mean you'll get all the available products
        .createQueryBuilder('product')
        .where('product.productId != (:...id)', {id: idOfUnavailableProduct})
        .getRawMany();
    

    if ( productAvailableData ) {   // stock id's of available product without duplicate
        productAvailableData.forEach((e) => {
            idOfAvailableProduct.push(e.product_productId);
        })
        idOfAvailableProduct = [...new Set(idOfAvailableProduct)]
    };

    
    
    const productAvailable = await getRepository(Product)    // get products in product database with array containing the searched id
            .createQueryBuilder()
            .where('id IN(:id)', {id: idOfAvailableProduct})
            .getRawMany();

    
    return productAvailable;


}