import { getConnection, getRepository } from "typeorm";
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



export async function getOrderUndone() {
    return await getRepository(Order) // Get every ingredient that have 0 stocl
    .createQueryBuilder( "order")
    .select(['order.id'])
    .where("order.state = (:state)", {state: false})
    .getRawMany();   
    
}


export async function deliverOrder(id: any) {
    console.log(id);
    await getConnection()
        .createQueryBuilder()
        .update(Order)
        .set({'state': true})
        .where("id = (:id)", {id: id})
        .execute();
    
}