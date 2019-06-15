import { Router } from 'express';
import AccountValidation from '../validations/Account.validation';
import AccountController from '../controllers/Account.controller';
import Authorization from '../middlewares/Authorization';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';

const { validateCreateAccount, validateGetAccount } = AccountValidation;
const { checkToken, authorizeRole } = Authorization;
const { createAccount, getAccount, deleteAccount } = AccountController;

const router = Router();

router.post('/', checkToken, authorizeRole('client'), validateCreateAccount, asyncErrorHandler(createAccount));
router.get('/:accountNumber', checkToken, validateGetAccount, asyncErrorHandler(getAccount));
router.delete('/:accountNumber', checkToken, authorizeRole('staff'), validateGetAccount, asyncErrorHandler(deleteAccount));
export default router;
