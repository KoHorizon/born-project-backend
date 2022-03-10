import { getRepository } from 'typeorm';
import { Custom_Product } from '../models/Custom_Product';
import { Order } from '../models/Order';
import { Order_has_Product } from '../models/Order_has_Product';
import { Product } from '../models/Product';


export async function createOrderHasProductCustom( order: Order, customProduct: Custom_Product) {
    const order_h_productCustom = new Order_has_Product();
    
    order_h_productCustom.order = order
    order_h_productCustom.product_custom = customProduct
    order_h_productCustom.product = null
    
    return await Order_has_Product.save(order_h_productCustom)
}


export async function createOrderHasProductOfficial( order: Order, product: Product) {
    const order_h_productOfficial = new Order_has_Product();

    try {
        order_h_productOfficial.order = order
        order_h_productOfficial.product_custom = null
        order_h_productOfficial.product = product
        return await Order_has_Product.save(order_h_productOfficial)
        
    } catch (error) {
        console.log(error);
        
    }
}


export async function getOrderProducts(order: Order) {
    
    return await getRepository(Order_has_Product) // Get every ingredient that have 0 stocl
        .createQueryBuilder( "order")
        .select(['order.productid','order.productcustomid'])
        .where("order.orderid = (:id)", {id: order.id})
        .getRawMany();   
}



export async function getIdOfOrderHasProduct(order: Order) {
    return await getRepository(Order_has_Product) // Get every ingredient that have 0 stocl
        .createQueryBuilder( "order_h_product")
        .select(['order_h_product.id'])
        .where("order_h_product.orderid = (:id)", {id: order.id})
        .getRawMany();   
}