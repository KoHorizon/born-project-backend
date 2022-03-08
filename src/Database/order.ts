import { Order } from "../models/Order";



export default async function createOrder(email) {
    let order = new Order()
    const datetime = new Date();
    try {
        order.date = datetime
        order.state = false
        if (email) {
            order.email = email
        }else {
            order.email = null
        }
        
    } catch (error) {
        throw error
    }
    
    return await Order.save(order);
}