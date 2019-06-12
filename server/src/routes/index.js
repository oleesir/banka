import { Router } from 'express';
import authRoutes from './Auth.route';
import accountRoutes from './Account.route';
import transactionRoutes from './Transaction.route';


const router = Router();

router.use('/auth', authRoutes);
router.use('/accounts', accountRoutes);
router.use('/transactions', transactionRoutes);

export default router;
