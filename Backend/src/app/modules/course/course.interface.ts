import { Types } from 'mongoose';
import { TReview } from '../review/review.interface';

export type TTags = {
  name: string;
  isDeleted: boolean;
};
export type TDetails = {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
};

export type TCourse = {
  _id: string;
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: [TTags];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks?: number;
  details: TDetails;
  reviews?: TReview[];
  averageRating: number;
  reviewCount: number;
  createdBy?: Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
};
