import { Response, Request} from 'express';
import { deliverOrder } from '../Database/order';


export async function orderFinishedPost(req: Request, res: Response) {

    const id = req.params.id
    try {
        const deliver = await deliverOrder(id)

        res.status(200).json({
            status: 200,
            response: "Order have been delivered"
        })
    } catch (error) {
        res.json({
            status: 400,
            response: "Couldn't deliver the order"
        })
    }
}