import { Router } from 'express';
import authRoutes from './Auth.route';
import userRoutes from './User.route';
import accountRoutes from './Account.route';
import transactionRoutes from './Transaction.route';


const router = Router();

router.use('/auth', authRoutes);
router.use('/accounts', accountRoutes);
router.use('/transactions', transactionRoutes);
router.use('/users', userRoutes);

export default router;
