import { Request, Response } from "express";
import { getProduct } from "../Database/product";




export async function productControllerGet(req: Request, res: Response) {

    try {
        const product = await getProduct();        
        return res.status(200).json({
            status: 200,
            product: product
        })
        
    } catch (error) {
        return res.status(404).json({
            status: 404,
            data: 'No data have been found'
        })
        
    }
    
}


export async function productControllerPost(req: Request, res: Response) {
    try {
        
    } catch (error) {
        
    }
}