import { Request, Response } from "express";
import { deleteProduct, getProduct, getProductById, updateProduct } from "../Database/product";




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


export async function productControllerPut(req: Request, res: Response) {
    
    try {
        const id = parseInt(req.params.id)

        const data = req.body
        const updatedProduct = await updateProduct(data, id)
        const product = await getProductById(id)
        res.status(200).json({
            status:200,
            response: product
        })

    } catch (error) {
        res.status(400).json({
            status:400,
            response: "An Error have been catched during the update process"
        })
    }
}


export async function productControllerDelete(req: Request, res: Response) {
    
    try {
        const id = parseInt(req.params.id)
        const deletedProduct = await deleteProduct(id)
        console.log(deletedProduct);
        

        res.status(200).json({
            status:200,
            response: 'The product have been deleted succesfully'
        })

    } catch (error) {
        res.status(400).json({
            status:400,
            response: "An Error have been catched during the delete process"
        })
    }
}