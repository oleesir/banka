import { Router } from 'express';
import AuthController from '../controllers/Auth.controller';
import AuthValidation from '../Validation/Auth.validation';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';

const router = Router();

const { signup } = AuthController;
const { validateSignup } = AuthValidation;


router.post('/signup', validateSignup, asyncErrorHandler(signup));

export default router;
