import { Router } from  'express';
import { orderFinishedPost } from '../Controllers/order';


export const router = Router();


router.get('/:id', orderFinishedPost);
