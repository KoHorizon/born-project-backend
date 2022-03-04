import { getRepository } from "typeorm";
import { createProduct } from "../Interface/productInterface";
import { Ingredient } from "../models/Ingredient";
import { Product } from "../models/Product";
import { Product_has_Ingredient } from "../models/Product_has_Ingredient";
import { postProduct } from "./product";




// export async function createProductHasIngredient(dataProductAndIngredient: any) {

//     try {

//     } catch (error) {
//         console.log('data have not be published');
        
//     }
// }

export async function createCustomProducts(customProduct:any) {

    customProduct.ingredients.forEach(async (ingredient) => {
        let productHasIngredient = new Product_has_Ingredient();

        productHasIngredient.product = customProduct.product.id
        productHasIngredient.ingredient = ingredient.id

        await Product_has_Ingredient.save(productHasIngredient)
    })
    return;
}


export async function createOfficialProducts(officialProduct:any) {
    // This function will link the created product with the given ingredinet from the request POST, only if custom field is at false
    const productToCreate = officialProduct.product

    const postedProduct = await postProduct(productToCreate)
    const productToLinkWithIngredient = postedProduct;

    officialProduct.ingredients.forEach(async (ingredient) => {
        let productHasIngredient = new Product_has_Ingredient();

        productHasIngredient.product = productToLinkWithIngredient
        productHasIngredient.ingredient = ingredient.id

        await Product_has_Ingredient.save(productHasIngredient)
    })
    return;
    
    
}