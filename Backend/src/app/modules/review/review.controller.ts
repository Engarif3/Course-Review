import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { ReviewServices } from './review.service';

const createReview = catchAsync(async (req, res) => {
  const review = req.body;
  review.createdBy = req.user;

  const result = await ReviewServices.createReviewIntoDB(review);

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: 'Review created successfully',
    data: {
      _id: result._id,
      courseId: result.courseId,
      rating: result.rating,
      review: result.review,
      createdBy: result.createdBy,
      createdAt: result.createdAt,
      updatedAt: result.createdAt,
    },
  });
});

const getAllReviews = catchAsync(async (req, res) => {
  const result = await ReviewServices.getAllReviewsFromDB();

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Reviews retrieved successfully',
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
  getAllReviews,
};
