import { Router } from "express";
import { productControllerGet } from "../Controllers/products";


export const router = Router();


router.get('/', productControllerGet)
