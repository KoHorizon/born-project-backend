import express , { Request, Response, NextFunction}from 'express';
// import { createConnection, getConnection } from "typeorm";
import Connection from './Services/Connection';
import * as bodyParser from 'body-parser';
import * as jwtexpress from 'express-jwt';
import { User } from './models/User';
import router from './Routes';
import cors from 'cors';

require('dotenv').config();



var jwtexpress = require('express-jwt');


const app = express();
const port = 3000;
app.use(cors());

app.use(express.json());

app.use(jwtexpress({ secret: process.env.MY_SECRET_PASS, algorithms: ['HS256']}).unless({
  path: [
      '/api/auth',
      { url: "/users", methods: ['POST'] }
  ]
}),	function(err: Error, req: Request, res: Response, next: NextFunction) {
	if (err.name === 'UnauthorizedError') {
		res.status(401).send('invalid token...');
		return;
	}
	next();
});



app.use( async(req, res, next) =>{

  if (req.user) {
    req.user = await User.findOne({where: {id: req.user.id}})
    next()
  } else {
    next()
  }

})


Connection.connectToDatabase();




app.use(router);




app.listen(port, () => {
  console.log("Je viens d'ouvrir la frotiere sur le port :" , port);
})