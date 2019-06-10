import { Router } from 'express';
import AccountValidation from '../validations/Account.validation';
import AccountController from '../controllers/Account.controller';
import Authorization from '../middlewares/Authorization';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';

const { validateCreateAccount, validateGetAccount } = AccountValidation;
const { checkToken } = Authorization;
const { createAccount, getAccount } = AccountController;

const router = Router();

router.post('/', checkToken, validateCreateAccount, asyncErrorHandler(createAccount));
router.get('/:accountNumber', checkToken, validateGetAccount, asyncErrorHandler(getAccount));

export default router;
