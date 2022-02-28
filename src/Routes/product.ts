import { Router } from "express";
import { getProductController } from "../Controllers/products";


export const router = Router();


router.use('/', getProductController)