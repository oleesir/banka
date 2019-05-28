import { Router } from 'express';
import AuthController from '../controllers/Auth.controller';
import AuthValidation from '../Validation/Auth.validation';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';

const router = Router();

const { signup, login } = AuthController;
const { validateSignup, validateLogin } = AuthValidation;


router.post('/signup', validateSignup, asyncErrorHandler(signup));
router.post('/login', validateLogin, asyncErrorHandler(login));
export default router;
