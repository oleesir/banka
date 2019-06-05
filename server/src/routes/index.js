import { Router } from 'express';
import authRoutes from './Auth.route';
import accountRoutes from './Account.route';


const router = Router();

router.use('/auth', authRoutes);
router.use('/accounts', accountRoutes);

export default router;
