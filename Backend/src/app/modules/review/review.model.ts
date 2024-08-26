import { Schema, model } from 'mongoose';
import { TReview } from './review.interface';

const reviewSchema = new Schema<TReview>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
    rating: {
      type: Number,
      required: true,
      validate: {
        validator: function (value: number) {
          return value >= 1 && value <= 5;
        },
        message: 'Rating must be between 1 and 5.',
      },
    },
    review: {
      type: String,
      required: true,
    },
    // createdBy: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    // },
    createdBy: {
      _id: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

export const Review = model<TReview>('review', reviewSchema);
