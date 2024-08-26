import { TReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDB = async (categoryData: TReview) => {
  const result = await Review.create(categoryData);
  return result;
};
const getAllReviewsFromDB = async () => {
  const result = await Review.find();
  return result;
};

export const ReviewServices = { createReviewIntoDB, getAllReviewsFromDB };
