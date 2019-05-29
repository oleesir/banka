import { Router } from 'express';
import AuthController from '../controllers/Auth.controller';
import AuthValidation from '../Validation/Auth.validation';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';

const router = Router();

const { signup, signin } = AuthController;
const { validateSignup, validateSignin } = AuthValidation;


router.post('/signup', validateSignup, asyncErrorHandler(signup));
router.post('/signin', validateSignin, asyncErrorHandler(signin));

export default router;
