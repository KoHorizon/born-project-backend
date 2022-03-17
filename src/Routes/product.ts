import { Router } from "express";
import { productControllerDelete, productControllerGet, productControllerPut } from "../Controllers/products";


export const router = Router();


router.get('/', productControllerGet)
router.put('/:id', productControllerPut)
router.get('/:id', productControllerDelete)



