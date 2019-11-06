import { Router } from 'express';
import TransactionController from '../controllers/Transaction.controller';
import Authorization from '../middlewares/Authorization';
import TransactionValidation from '../validations/Transaction.validation';
import AccountValidation from '../validations/Account.validation';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';

const router = Router();

const {
  creditTransaction,
  debitTransaction,
  getTransaction
} = TransactionController;
const { checkToken, authorizeRole } = Authorization;
const {
  validateCreditTransaction,
  validateDebitTransaction,
  validateGetTransaction
} = TransactionValidation;
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
    authorizeRole(['staff', 'admin']),
    validateGetAccount,
    validateDebitTransaction,
    asyncErrorHandler(debitTransaction)
  );

router
  .get(
    '/:transactionId',
    checkToken,
    validateGetTransaction,
    asyncErrorHandler(getTransaction)
  );

export default router;
