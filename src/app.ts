import express , { Request, Response, NextFunction}from 'express';
// import { createConnection, getConnection } from "typeorm";
import Connection from './Services/Connection';
import * as bodyParser from 'body-parser';
import * as jwtexpress from 'express-jwt';
import { User } from './models/User';
import router from './Routes';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
const socketIo = require("socket.io");

declare global {
  namespace Express {
    interface Request {
      user: User;
      io: Server
    }
  }
}




require('dotenv').config();



var jwtexpress = require('express-jwt');


const app = express();

const server = http.createServer(app);
const io = socketIo(server);
global.io = io

// const io = new Server(server, {
//     cors: {
//         origin: '*',
//         methods: 'GET,PUT,POST,DELETE',
//     }
// });

const port = 3000;
app.use(cors());

app.use(express.json());

app.use(jwtexpress({ secret: process.env.MY_SECRET_PASS, algorithms: ['HS256']}).unless({
  path: [
      '/api/auth',
      { url: "/api/users", methods: ['POST'] }
  ]
}),	function(err: Error, req: Request, res: Response, next: NextFunction) {
	if (err.name === 'UnauthorizedError') {
		res.status(401).send('invalid token...');
		return;
	}
  req.io = io  
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