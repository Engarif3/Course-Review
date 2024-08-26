/* eslint-disable no-unused-vars */
import { CourseServices } from './course.service';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';

const createCourse = catchAsync(async (req, res) => {
  const course = req.body;
  course.createdBy = req.user._id;

  const {
    _id,
    title,
    instructor,
    categoryId,
    price,
    tags,
    startDate,
    endDate,
    language,
    provider,
    durationInWeeks,
    details,
    createdAt,
    updatedAt,
  } = await CourseServices.createCourseIntoDB(course);
  res.status(200).json({
    success: true,
    statusCode: 201,
    message: 'Course created successfully',
    data: {
      _id,
      title,
      instructor,
      categoryId,
      price,
      tags,
      startDate,
      endDate,
      language,
      provider,
      durationInWeeks,
      details,
      createdBy: req.user._id,
      createdAt,
      updatedAt,
    },
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB();

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'All courses retrieved successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(courseId);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course retrieved successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  const result = await CourseServices.updateCourseIntoDB(courseId, req.body);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Course updated successfully',
    data: result,
  });
});

const getSingleCourseWithReviews = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result =
    await CourseServices.getSingleCourseWithReviewsFromDB(courseId);

  if (!result) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'Course not found',
    });
  }

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course with reviews retrieved successfully',
    data: result,
  });
});

const getBestCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.getBestCourseFromDB();

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Best course retrieved successfully',
    data: result,
  });
});

// ==============================
const getPaginatedAndFilteredCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getPaginatedAndFilteredCoursesFromDB(
    req.query,
  );
  const { page = '1', limit = '10', total } = result.meta;

  const simplifiedCourses = result.courses.map((course) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { averageRating, reviewCount, reviews, ...rest } = course.toJSON();
    return rest;
  });

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Courses retrieved successfully',
    meta: {
      page: +page,
      limit: +limit,
      total,
    },
    data: { courses: simplifiedCourses },
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  getSingleCourseWithReviews,
  getBestCourse,
  getPaginatedAndFilteredCourses,
};
