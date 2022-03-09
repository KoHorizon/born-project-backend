import { Exclude_Ingredient_For_Order } from "../models/Exclude_Ingredient_For_Order";
import { Order } from "../models/Order";
import { Order_has_Product } from "../models/Order_has_Product";



export async function postExcludedIngredient(excludeIngredient: any, createdOrder_h_product: Order_has_Product) {
    const exclude_ingredient_for_order = new Exclude_Ingredient_For_Order();

    try {

        exclude_ingredient_for_order.ingredient = excludeIngredient
        exclude_ingredient_for_order.order_h_product = createdOrder_h_product
        return await Exclude_Ingredient_For_Order.save(exclude_ingredient_for_order)

    } catch (error) {
        throw error
    }
    
}