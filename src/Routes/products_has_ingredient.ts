import { Router } from "express";
import { productHasIngredientControllerPost, productHasIngredientGet } from "../Controllers/products_has_ingredient";


export const router = Router();


router.post('/', productHasIngredientControllerPost);
router.get('/:id',productHasIngredientGet);