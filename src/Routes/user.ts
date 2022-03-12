import express, { Router } from 'express';
import { User } from '../models/User';
import * as sha512 from 'js-sha512';


export const router = Router();




router.post('/', async (req, res) => {

    let user = new User();
    user.name = req.body.name;
    user.pincode = sha512.sha512(req.body.pincode);

    
    let savedUser = await User.save(user);
    res.json({status: 200, data: savedUser})
})

router.get('/', async(req,res) => {
    let users = await User.find()

    res.json({status: 200, data: users})

})

