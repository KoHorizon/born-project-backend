import { Router } from "express";
import { productHasIngredientControllerPost } from "../Controllers/products_has_ingredient";


export const router = Router();


router.post('/', productHasIngredientControllerPost);
