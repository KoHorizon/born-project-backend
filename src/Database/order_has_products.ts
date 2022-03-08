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