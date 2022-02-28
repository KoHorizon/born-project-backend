import { Request, Response } from "express";
import { getProduct } from "../Database/product";




export async function getProductController(req: Request, res: Response) {

    try {
        const product = await getProduct();        
        return res.status(200).json({
            status: 200,
            data: product
        })
        
    } catch (error) {
        return res.status(404).json({
            status: 200,
            data: 'No data have been found'
        })
        
    }
    
}