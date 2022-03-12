import { User } from "../models/User";
import { Response, Request} from 'express';
import * as sha512 from 'js-sha512';
import * as jwt from 'jsonwebtoken';




export async function authControllerPost(req: Request, res: Response) {
    let user = await User.findOne({where: {  
        name: req.body.name,
        pincode: sha512.sha512(req.body.pincode)
    }})
    if (!user) {
        res.status(404).json({
            status: 404,
            response: "no corresponding user have been found in database"
        })
    }
    let token = jwt.sign({ id: user.id }, process.env.MY_SECRET_PASS);

    res.json({status: 200, access_token: token})
}