import { Product_has_Ingredient } from "../models/Product_has_Ingredient";
import { getCustomProductPrice, updatePriceOfCustomProduct } from "./customProduct";
import { postCustomProduct, postProduct } from "./product";




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