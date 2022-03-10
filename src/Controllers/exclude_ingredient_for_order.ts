import { postExcludedIngredient } from "../Database/exclude_ingredient_for_order";
import { getIngredientOfProduct } from "../Database/ingredient";
import { Ingredient } from "../models/Ingredient";
import { Order } from "../models/Order";
import { Order_has_Product } from "../models/Order_has_Product";
import { Product } from "../models/Product";


export async function excludeIngredient(ingredientToExclude: [Ingredient], product: any, order: Order_has_Product) {
    // All the query are done with the ID's.
    const productData = product.product;

    // console.log(productData);
    // return
    let ingredientsIdOfProduct = []
    let ingredientCanBeExcluded = true;

    let numberOfIngredients = 0
    let numberOfIngredientsToExclude = 0

    const ingredients= await getIngredientOfProduct(productData);
    for (const {ingredientid} of ingredients) {
        ingredientsIdOfProduct.push(ingredientid);
        numberOfIngredients += 1
    }

    for (const {id} of ingredientToExclude) {
        if (ingredientsIdOfProduct.includes(id) === false) ingredientCanBeExcluded = false
        numberOfIngredientsToExclude += 1
    }
    // ---------------------VERIFICATION------------------------
    // You can exclude ingredient only if you try to exclude less ingredients than the official amount of ingredients
    // The ingredient you try to exclude also needs to correspond to the official list of ingredient of the product.


    if (ingredientCanBeExcluded && numberOfIngredientsToExclude < numberOfIngredients) {
        try {
            for (const {id} of ingredientToExclude) {
                const exclude = await postExcludedIngredient(id, order, productData)
            }
        } catch (error) {
            throw error
        }
    }

}