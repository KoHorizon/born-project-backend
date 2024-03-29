import { Product } from "../models/Product";
import { Product_has_Ingredient } from "../models/Product_has_Ingredient";
import {getConnection, getRepository} from "typeorm";
import { Ingredient } from "../models/Ingredient";
import { Custom_Product } from "../models/Custom_Product";

export async function getProduct() {
    
    let idOfUnavailableIngredient = []
    let idOfUnavailableProduct = []
    let idOfAvailableProduct = []

    const ingredientUnavailable = await getRepository(Ingredient) // Get every ingredient that have 0 stocl
        .createQueryBuilder( "ingredient")
        .select(['ingredient.id'])
        .where("ingredient.stock < 1")
        .getMany();     


    if (Array.isArray(ingredientUnavailable) && ingredientUnavailable.length == 0) {  // check if array is empty        
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
        await checkProductAvailability(idOfAvailableProduct,true);

        await getRepository(Product)   // get products in product database with array containing the searched id
            .createQueryBuilder()
            .where('id IN(:id)', {id: idOfAvailableProduct})
            .getRawMany();
            
        const product = await Product.find()
        return product;
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
    


    await checkProductAvailability(idOfUnavailableProduct, false);
    await checkProductAvailability(idOfAvailableProduct, true);

    try { // try catch made because when every product are not existent, the query is return an error
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
    } catch (error) {
        const ingredient = await Product.find()
        return ingredient;
    }

    const product = await Product.find()
    return product;
}




export async function checkProductAvailability(idTocheckProductAvailability:Array<[]>, state: boolean) {
    
    if ( idTocheckProductAvailability.length > 0 ) {
        await getConnection()
        .createQueryBuilder()
        .update(Product)
        .set({'availability': state})
        .where("id IN(:id)", {id: idTocheckProductAvailability})
        .execute();
    } 

}


export async function postProduct(productToCreate: Product) {
    let product = new Product();
    
    product.img_name = productToCreate.img_name
    product.custom = false
    product.name = productToCreate.name
    product.price = 0
    product.availability = false
    product.day_special = false

    await Product.save(product);
    return product;    
}


export async function postCustomProduct() {
    let customProduct = new Custom_Product();

    customProduct.price = 0.00


    await Custom_Product.save(customProduct);
    return customProduct;    
}


export async function getProdudct(id: number) {
    console.log(id);
    
    return await getRepository(Product)
            .createQueryBuilder('product')
            .select(['product.id'])
            .where('product.id = (:id)', {id: id })
            .getRawMany();
}


export async function updatePriceOfProduct(idOfProduct: any, price: any) {
    return await getConnection()
        .createQueryBuilder()
        .update(Product)
        .set({'price': price})
        .where("id = (:id)", {id: idOfProduct})
        .execute();
}


export async function getOfficialProductPrice(productId: number) {
    return await getRepository(Product)
            .createQueryBuilder('product')
            .select(['product.price'])
            .where('product.id = (:id)', {id: productId })
            .getRawMany();
}


export async function getProductById(productId: number) {
    return await Product.find({where:{id: productId}})
}



export async function updateProduct(value: any, id: any) {
    return await getConnection()
        .createQueryBuilder()
        .update(Product)
        .set({'name': value.name, 'price': value.price, 'day_special': value.day_special})
        .where("id = (:id)", {id: id})
        .execute();
}



export async function deleteProduct(id: number) {    
    return await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Product)
    .where("id = :id", { id: id })
    .execute()
}