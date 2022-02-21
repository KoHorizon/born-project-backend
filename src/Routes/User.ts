import express from 'express';
import { User } from '../models/User';
import * as sha512 from 'js-sha512';


let routerUser = express.Router();



routerUser.post('/users', async (req, res) => {
    let user = new User();
    user.name = req.body.name;
    user.pincode = sha512.sha512(req.body.pincode);

    
    let savedUser = await User.save(user);
    res.json({status: 200, data: savedUser})
})

routerUser.get('/users', async(req,res) => {
    let users = await User.find()

    res.json({status: 200, data: users})

})

export default routerUser;
