import {router as auth} from './auth';
import {router as ingredient} from './ingredient';
import {router as product} from './product';
import {router as productHasIngredient} from './products_has_ingredient';
import {router as orderHasProduct} from './order_has_product';



import { Router } from 'express';


const router = Router();
router.use('/auth', auth);
router.use('/ingredients', ingredient);
router.use('/product', product);
router.use('/product-has-ingredient', productHasIngredient);
router.use('/order-has-product', orderHasProduct);






const baseRoute = Router();
baseRoute.use('/api',router);
export default baseRoute;