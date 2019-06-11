import { Router } from 'express';
import TransactionController from '../controllers/Transaction.controller';
import Authorization from '../middlewares/Authorization';
import TransactionValidation from '../validations/Transaction.validation';
import AccountValidation from '../validations/Account.validation';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';

const router = Router();

const { creditTransaction } = TransactionController;
const { checkToken } = Authorization;
const { validateCreditTransaction } = TransactionValidation;
const { validateGetAccount } = AccountValidation;

router
  . post('/:accountNumber/credit',
    checkToken,
    validateGetAccount,
    validateCreditTransaction,
    asyncErrorHandler(creditTransaction));

export default router;
