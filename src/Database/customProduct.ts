import {getConnection, getRepository} from 'typeorm';
import { Custom_Product } from '../models/Custom_Product';
import { Ingredient } from '../models/Ingredient';
import { Product_has_Ingredient } from '../models/Product_has_Ingredient';


export async function getCustomProductPrice(customProductId: number) {
    let priceOfCustomProduct = 0;
    
    if (customProductId) {
        const ingredientOfCustomProduct = await getRepository(Product_has_Ingredient)
        .createQueryBuilder('product')
        .select(['product.ingredientId'])
        .where('productCustomId IN(:id)', {id: customProductId })
        .getRawMany();        
        
        for (const {ingredientId} of ingredientOfCustomProduct) {
            
            const ingredientPrice = await getRepository(Ingredient)
            .createQueryBuilder('ingredient')
            .select(['ingredient.price'])
            .where('ingredient.id = (:id)', {id: ingredientId })
            .getRawMany();

            priceOfCustomProduct += parseFloat(ingredientPrice[0].ingredient_price)
        }
    }    
    return priceOfCustomProduct;
}


export async function updatePriceOfCustomProduct(idOfProduct: number, price: number) {    
    if (idOfProduct) {
        await getConnection()
        .createQueryBuilder()
        .update(Custom_Product)
        .set({'price': price})
        .where("id = (:id)", {id: idOfProduct})
        .execute();
    }
    return 'The price of customProduct Have been updated';
}