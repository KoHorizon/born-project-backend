import {router as auth} from './auth';
import {router as ingredient} from './ingredient';
import {router as product} from './product';


import { Router } from 'express';


const router = Router();
router.use('/auth', auth);
router.use('/ingredients', ingredient);
router.use('/product', product);




const baseRoute = Router();
baseRoute.use('/api',router);
export default baseRoute;