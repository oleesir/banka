import { Router } from 'express';
import TransactionController from '../controllers/Transaction.controller';
import Authorization from '../middlewares/Authorization';
import TransactionValidation from '../validations/Transaction.validation';
import AccountValidation from '../validations/Account.validation';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';

const router = Router();

const { creditTransaction, debitTransaction } = TransactionController;
const { checkToken } = Authorization;
const { validateCreditTransaction, validateDebitTransaction } = TransactionValidation;
const { validateGetAccount } = AccountValidation;

router
  . post(
    '/:accountNumber/credit',
    checkToken,
    validateGetAccount,
    validateCreditTransaction,
    asyncErrorHandler(creditTransaction)
  );
router
  .post(
    '/:accountNumber/debit',
    checkToken,
    validateGetAccount,
    validateDebitTransaction,
    asyncErrorHandler(debitTransaction)
  );

export default router;
