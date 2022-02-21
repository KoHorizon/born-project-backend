import express from 'express';
// import { createConnection, getConnection } from "typeorm";
import Connection from './Services/Connection';
import * as bodyParser from 'body-parser';
import * as jwtexpress from 'express-jwt';
import routerAuth from './Routes/Auth';
import routerUser from './Routes/User';
import { User } from './models/User';
import routerIngredient from './Routes/Ingredient';
require('dotenv').config();



var jwtexpress = require('express-jwt');


const app = express();
const port = 3000;

app.use(bodyParser.json())

app.use(jwtexpress({ secret: process.env.MY_SECRET_PASS, algorithms: ['HS256']}).unless({
  path: [
      '/auth',
      { url: "/users", methods: ['POST'] }
  ]
}));



app.use( async(req, res, next) =>{

  if (req.user) {
    req.user = await User.findOne({where: {id: req.user.id}})
    next()
  } else {
    next()
  }

})


Connection.connectToDatabase();


// app.use(bodyParser.json())




app.use(routerAuth);
app.use(routerUser);
app.use(routerIngredient);




app.listen(port, () => {
  console.log("Je viens d'ouvrir la frotiere sur le port :" , port);
})