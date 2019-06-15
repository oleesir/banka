import { Router } from 'express';
import TransactionController from '../controllers/Transaction.controller';
import Authorization from '../middlewares/Authorization';
import TransactionValidation from '../validations/Transaction.validation';
import AccountValidation from '../validations/Account.validation';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';

const router = Router();

const { creditTransaction, debitTransaction } = TransactionController;
const { checkToken, authorizeRole } = Authorization;
const { validateCreditTransaction, validateDebitTransaction } = TransactionValidation;
const { validateGetAccount } = AccountValidation;

router
  . post(
    '/:accountNumber/credit',
    checkToken,
    authorizeRole('staff'),
    validateGetAccount,
    validateCreditTransaction,
    asyncErrorHandler(creditTransaction)
  );
router
  .post(
    '/:accountNumber/debit',
    checkToken,
    authorizeRole('staff'),
    validateGetAccount,
    validateDebitTransaction,
    asyncErrorHandler(debitTransaction)
  );

export default router;
