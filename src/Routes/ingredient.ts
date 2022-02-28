import express from 'express';
import { Ingredient } from '../models/Ingredient';
import { Router } from  'express';
import { ingredientControllerGet, ingredientControllerPost } from '../Controllers/ingredients';



export const router = Router();
router.post('/', ingredientControllerPost);
router.get('/', ingredientControllerGet);


// -----------------------------------------------------------------------------


