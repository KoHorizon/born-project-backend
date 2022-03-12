import { getConnection, getRepository } from "typeorm";
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

export async function getIngredientAll() {
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

export async function getIngredientOfProductById(productId: any) {
    return await getRepository(Product_has_Ingredient)
            .createQueryBuilder('product')
            .select(['product.ingredientid'])
            .where('product.productid = (:id)', {id: productId })
            .getRawMany();
}

export async function getPriceOfIngredient(idIngredientId: any) {
    
    return await getRepository(Ingredient)
        .createQueryBuilder('ingredient')
        .select(['ingredient.price'])
        .where('ingredient.id = (:id)', {id: idIngredientId })
        .getRawMany();
}


export async function getIngredient(idIngredientId: any) {
    
    return await getRepository(Ingredient)
        .createQueryBuilder('ingredient')
        .select(['ingredient.id'])
        .where('ingredient.id = (:id)', {id: idIngredientId })
        .getRawMany();
}


export async function substractIngredientStock(arrayOfIdToSubstract: any) {
    for await (const id of arrayOfIdToSubstract) {
        await getConnection()
            .createQueryBuilder()
            .update(Ingredient)
            .set({stock: () => "stock - 1"})
            .where("id = (:id)", {id: id})
            .execute();    
    }

}