import express from 'express';
// import { createConnection, getConnection } from "typeorm";
import Connection from './Services/Connection';
import * as jwtexpress from 'express-jwt';
import * as bodyParser from 'body-parser';
import * as jwt from 'jsonwebtoken'

var jwtexpress = require('express-jwt');


const app = express();



Connection.ConnectToDatabase()








// app.use(bodyParser.json())

const port = 3001;

app.get('/', (req, res) => {
  res.json({status:200, data: "Hello world" });
});


app.listen(port)