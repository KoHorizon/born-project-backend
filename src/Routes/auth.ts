import { Router } from 'express';
import { authControllerPost } from '../Controllers/auth';

export const router = Router();



router.post('/', authControllerPost);
