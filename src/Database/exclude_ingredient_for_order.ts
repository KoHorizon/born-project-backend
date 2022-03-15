import { getRepository } from "typeorm";
import { Exclude_Ingredient_For_Order } from "../models/Exclude_Ingredient_For_Order";
import { Order } from "../models/Order";
import { Order_has_Product } from "../models/Order_has_Product";
import { Product } from "../models/Product";



export async function postExcludedIngredient(excludeIngredient: any, createdOrder_h_product: Order_has_Product, product: Product) {
    const exclude_ingredient_for_order = new Exclude_Ingredient_For_Order();

    try {

        exclude_ingredient_for_order.ingredient = excludeIngredient
        exclude_ingredient_for_order.order_h_product = createdOrder_h_product
        exclude_ingredient_for_order.product =  product
        return await Exclude_Ingredient_For_Order.save(exclude_ingredient_for_order)

    } catch (error) {
        throw error
    }
    
}


export async function getExcludeIngredientOfOrder(arrayOfOrderHasProductId: any) {
    return await getRepository(Exclude_Ingredient_For_Order) // get the unavailable product with stock id's
        .createQueryBuilder('exclude_ingredient')
        .select(['exclude_ingredient.ingredientid'])
        .where('exclude_ingredient.orderhproductid IN(:id)', {id: arrayOfOrderHasProductId})
        .getRawMany();
}


export async function getIngredientOfOrder(arrayOfOrderHasProductId: any) {
    console.log(arrayOfOrderHasProductId);
    
    return await getRepository(Exclude_Ingredient_For_Order) // get the unavailable product with stock id's
        .createQueryBuilder('exclude_ingredient')
        .select(['exclude_ingredient.ingredientid'])
        .where('exclude_ingredient.orderhproductid IN(:id)', {id: arrayOfOrderHasProductId})
        .getRawMany();
}


export async function getExcludeIngredientOfOrderbyId(id: any) {
    return await getRepository(Exclude_Ingredient_For_Order) // get the unavailable product with stock id's
        .createQueryBuilder('exclude_ingredient')
        .select(['exclude_ingredient.ingredientid','exclude_ingredient.productid'])
        .where('exclude_ingredient.orderhproductid IN(:id)', {id: id})
        .getRawMany();
}