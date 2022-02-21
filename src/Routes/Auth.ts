import { User } from '../models/User';
import * as jwt from 'jsonwebtoken'
import * as sha512 from 'js-sha512';


import express from 'express';

let routerAuth = express.Router();

routerAuth.post('/auth', async (req, res) => {
    let user = await User.findOne({where: {  
        name: req.body.name,
        pincode: sha512.sha512(req.body.pincode)
    }})

    let token = jwt.sign({ id: user.id }, 'starfoullah');

    res.json({status: 200, data: token})
});


export default routerAuth;