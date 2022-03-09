import { getRepository } from "typeorm";
import { Ingredient } from "../models/Ingredient";
import { Product } from "../models/Product";
import { Product_has_Ingredient } from "../models/Product_has_Ingredient";



export async function createIngredient(dataIngredient: Array<Ingredient>) {
    
    if (!Array.isArray(dataIngredient)) {
        throw new Error('not array');  
    }
    let acceptedKeys = ['name','price','stock','img_name'];
    let validFormat = true;

    (dataIngredient).forEach(data => {        

        acceptedKeys.forEach(key => {
            if (!(key in data)) {
                validFormat = false;
            }
            
            if (Object.keys(data).length != acceptedKeys.length) {
                validFormat = false;
            }
        })

    })
    
    if (!validFormat) {
        throw new Error('wrong format');
    }



    (dataIngredient).forEach( async data => {
        let ingredient = new Ingredient();

        Object.entries(data).forEach(([key, value]) => {

            switch (key) {
                case "name":
                    ingredient.name = data.name;
                    break;
                case "price":
                    ingredient.price = data.price;
                    break;
                case "stock":
                    ingredient.stock = data.stock;
                    break;
                case "img_name":
                    ingredient.img_name = data.img_name;
                    break;
            }
        
        });        
        await Ingredient.save(ingredient);
    });
    return;
}

export async function getIngredient() {
    const ingredient = await Ingredient.find()
    return ingredient;
}


export async function getIngredientOfProduct(product: Product) {
    return await getRepository(Product_has_Ingredient)
            .createQueryBuilder('product')
            .select(['product.ingredientid'])
            .where('product.productid = (:id)', {id: product.id })
            .getRawMany();
}