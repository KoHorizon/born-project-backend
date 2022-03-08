import { orderHasProductPost } from "../Controllers/order_has_products";
import { Router } from  'express';


export const router = Router();


router.post('/', orderHasProductPost);