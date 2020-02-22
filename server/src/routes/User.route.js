import { Router } from 'express';
import UserValidation from '../validations/User.validation';
import UserController from '../controllers/User.controller';
import Authorization from '../middlewares/Authorization';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';


const {
  validateCreateStaff
} = UserValidation;

const { checkToken, authorizeRole } = Authorization;

const {
  createStaff
} = UserController;

const router = Router();

router.post('/',
  checkToken,
  authorizeRole(['admin']),
  validateCreateStaff,
  asyncErrorHandler(createStaff));


export default router;
