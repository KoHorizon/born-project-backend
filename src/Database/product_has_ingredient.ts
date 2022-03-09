import { error } from "console";
import { Product_has_Ingredient } from "../models/Product_has_Ingredient";
import { getCustomProductPrice, updatePriceOfCustomProduct } from "./customProduct";
import { getIngredient, getIngredientAll, getPriceOfIngredient } from "./ingredient";
import { getProdudct, postCustomProduct, postProduct, updatePriceOfProduct } from "./product";




export async function createCustomProducts(customProduct:any) {
    
    if (customProduct.ingredients.length > 0 ) {

        const postedCustomProduct = await postCustomProduct()
        const productToLinkWithIngredient = postedCustomProduct;
        const customProductId = productToLinkWithIngredient.id;
    
        await Promise.all(customProduct.ingredients.map(async (ingredient: any) => {
            let productHasIngredient = new Product_has_Ingredient();
            
            productHasIngredient.product_custom = productToLinkWithIngredient
            productHasIngredient.ingredient = ingredient.id
            
            await Product_has_Ingredient.save(productHasIngredient)
        }))
        
        const priceOfCustomProduct = await getCustomProductPrice(customProductId);
        const updatedPriceCustomProductData = await updatePriceOfCustomProduct(customProductId, priceOfCustomProduct);
    
        return postedCustomProduct;
    }
    return;
}


export async function createOfficialProducts(officialProduct:any) {
    // This function will link the created product with the given ingredinet from the request POST, only if custom field is at false
    const productToCreate = officialProduct.product
    const ingredientGiven = officialProduct.ingredients
    let ingredientExistInDatabase = true;


    let allIngredient = []
    try {
        const getAllIngredient = await getIngredientAll();

        for (const {id} of getAllIngredient) {
            allIngredient.push(id)
        }

        for (const {id} of ingredientGiven) {            
            if (allIngredient.includes(id) === false) ingredientExistInDatabase = false
        }

        if (ingredientExistInDatabase === false ) {
            throw 'no ingredient correspond';  
        }        

    } catch (error) {
        return error
    }

    
    const postedProduct = await postProduct(productToCreate)
    const productToLinkWithIngredient = postedProduct;
    
    let priceToUpdateProduct = 0;
    try {
        for (const ingredient of officialProduct.ingredients) {
            
            let productHasIngredient = new Product_has_Ingredient();
        
            productHasIngredient.product = productToLinkWithIngredient
            productHasIngredient.ingredient = ingredient.id
        
            const createProdcutWithIngredient = await Product_has_Ingredient.save(productHasIngredient)     
            
            
            const priceOfIngredient = await getPriceOfIngredient(createProdcutWithIngredient.ingredient)
    
            for (const { ingredient_price } of priceOfIngredient) {
                priceToUpdateProduct += parseFloat(ingredient_price)
            }
            
        }
    
        const updatedPrice = await updatePriceOfProduct(postedProduct.id, priceToUpdateProduct)
        
    } catch (error) {
        throw error
    }
    
}