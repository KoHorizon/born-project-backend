import {router as auth} from './auth';
import {router as ingredient} from './ingredient';
import {router as product} from './product';
import {router as productHasIngredient} from './products_has_ingredient';


import { Router } from 'express';


const router = Router();
router.use('/auth', auth);
router.use('/ingredients', ingredient);
router.use('/product', product);
router.use('/product-has-ingredient', productHasIngredient);





const baseRoute = Router();
baseRoute.use('/api',router);
export default baseRoute;