import express from 'express';
import { ReviewControllers } from './review.controller';
import validateRequest from '../../middlewares/validateRequest';
import { reviewValidation } from './review.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(reviewValidation.reviewValidationSchema),
  ReviewControllers.createReview,
);
router.get('/', ReviewControllers.getAllReviews);

export const ReviewRoutes = router;
