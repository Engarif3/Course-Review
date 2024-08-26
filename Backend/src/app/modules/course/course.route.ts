import express from 'express';
import { CourseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/courses',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidation.courseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/course/best', CourseControllers.getBestCourse);
// router.get('/', CourseControllers.getAllCourses);
router.get('/courses', CourseControllers.getPaginatedAndFilteredCourses);

router.get('/courses/:courseId', CourseControllers.getSingleCourse);

router.put(
  '/courses/:courseId',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.get(
  '/courses/:courseId/reviews',
  CourseControllers.getSingleCourseWithReviews,
);

export const CourseRoutes = router;
