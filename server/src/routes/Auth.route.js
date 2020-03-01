import { Router } from 'express';
import AuthValidation from '../validations/Auth.validation';
import AuthController from '../controllers/Auth.controller';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';
import Authorization from '../middlewares/Authorization';

const router = Router();

const { checkToken } = Authorization;

const { signup, signin, loggedInUser } = AuthController;
const { validateSignup, validateSignin } = AuthValidation;


router.post('/signup', validateSignup, asyncErrorHandler(signup));
router.post('/signin', validateSignin, asyncErrorHandler(signin));
router.get('/', checkToken, asyncErrorHandler(loggedInUser));

export default router;
