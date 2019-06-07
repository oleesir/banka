import { Router } from 'express';
import AccountValidation from '../validations/Account.validation';
import AccountController from '../controllers/Account.controller';
import Authorization from '../middlewares/Authorization';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';

const { validateCreateAccount } = AccountValidation;
const { checkToken } = Authorization;
const { createAccount } = AccountController;

const router = Router();

router.post('/', checkToken, validateCreateAccount, asyncErrorHandler(createAccount));

export default router;
