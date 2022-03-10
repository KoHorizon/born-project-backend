import { Invoice } from "../models/Invoice";
import { Order } from "../models/Order";


export async function createInvoice(price: number,order: Order) {
    
    let invoice = new Invoice();
    const datetime = new Date();
    
    try {
        invoice.date = datetime
        invoice.price = price
        invoice.order = order
        return await Invoice.save(invoice)
    } catch (error) {
        throw new Error("Couldn't create the invoice");    
    }

}