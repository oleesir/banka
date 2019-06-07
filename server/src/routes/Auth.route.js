import { Router } from 'express';
import AuthValidation from '../validations/Auth.validation';
import AuthController from '../controllers/Auth.controller';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';

const router = Router();

const { signup, signin } = AuthController;
const { validateSignup, validateSignin } = AuthValidation;


router.post('/signup', validateSignup, asyncErrorHandler(signup));
router.post('/signin', validateSignin, asyncErrorHandler(signin));

export default router;
