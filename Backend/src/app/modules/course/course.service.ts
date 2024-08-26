/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import { Course } from './course.model';
import mongoose from 'mongoose';
import { Review } from '../review/review.model';
import { TCourse, TTags } from './course.interface';

const createCourseIntoDB = async (courseData: TCourse) => {
  const startDate = moment(courseData.startDate);
  const endDate = moment(courseData.endDate);
  courseData.durationInWeeks = Math.ceil(
    endDate.diff(startDate, 'weeks', true),
  );

  const result = await Course.create(courseData);

  return result;
};

const getAllCoursesFromDB = async () => {
  const result = await Course.find();
  return result;
};
const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

// ======================================
const updateCourseIntoDB = async (
  id: string,
  payload: Partial<TCourse>,
): Promise<TCourse | null> => {
  const { tags, details, ...rest } = payload;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Update primitive fields using $set
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      { $set: rest },
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (tags) {
      await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            tags: { name: { $in: (tags ?? []).map((tag) => tag.name) } },
          },
        },
        { runValidators: true, session },
      );

      await Course.findByIdAndUpdate(
        id,
        { $push: { tags: { $each: tags ?? [] } } },
        { runValidators: true, session },
      );
    }

    if (details) {
      await Course.findByIdAndUpdate(
        id,
        {
          $set: {
            'details.level': details.level,
            'details.description': details.description,
          },
        },
        { runValidators: true, session },
      );
    }
    // Use select to exclude specific fields
    const updatedCourse = await Course.findById(
      id,
      '-averageRating -reviewCount -reviews',
    )
      .populate({
        path: 'createdBy',
        select:
          '-passwordHistory -createdAt -updatedAt -passwordChangedAt -__v',
      })
      .select('-__v')
      .session(session);

    // Modify the tags array to filter out deleted tags
    if (updatedCourse?.tags) {
      updatedCourse.tags = (updatedCourse.tags ?? []).filter(
        (tag) => !tag.isDeleted,
      ) as [TTags];
    }

    await session.commitTransaction();
    return updatedCourse;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getSingleCourseWithReviewsFromDB = async (id: string) => {
  const course = await Course.findById(
    id,
    '-averageRating -reviewCount -reviews',
  )
    .populate({
      path: 'createdBy',
      select: '-passwordHistory -createdAt -updatedAt -passwordChangedAt -__v',
    })
    .select('-__v');

  const reviews = await Review.find({ courseId: id }).select('-__v');

  return { course, reviews };
};

const getBestCourseFromDB = async () => {
  const bestCourse = await Course.aggregate([
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
    {
      $addFields: {
        averageRating: {
          $avg: '$reviews.rating',
        },
        reviewCount: {
          $size: '$reviews',
        },
      },
    },
    // Lookup and reshape createdBy
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'createdByArray',
      },
    },
    {
      $unwind: '$createdByArray',
    },
    {
      $replaceRoot: {
        newRoot: {
          course: {
            _id: '$_id',
            title: '$title',
            instructor: '$instructor',
            categoryId: '$categoryId',
            price: '$price',
            tags: '$tags',
            startDate: '$startDate',
            endDate: '$endDate',
            language: '$language',
            provider: '$provider',
            durationInWeeks: '$durationInWeeks',
            details: '$details',
            createdBy: {
              _id: '$createdByArray.createdBy._id',
              username: '$createdByArray.createdBy.username',
              email: '$createdByArray.createdBy.email',
              role: '$createdByArray.createdBy.role',
            },
            createdAt: '$createdByArray.createdAt',
            updatedAt: '$createdByArray.updatedAt',
          },
          averageRating: {
            $round: ['$averageRating', 1],
          },
          reviewCount: '$reviewCount',
        },
      },
    },
    {
      $sort: {
        'course.averageRating': -1,
        'course.reviewCount': -1,
      },
    },
    {
      $limit: 1,
    },
    {
      $project: {
        reviews: 0,
      },
    },
  ]);

  if (!bestCourse || bestCourse.length === 0) {
    throw new Error('Best course not found');
  }

  return bestCourse[0];
};

// ========================
const getPaginatedAndFilteredCoursesFromDB = async (query: any) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'startDate',
    sortOrder = 'asc',
    minPrice,
    maxPrice,
    tags,
    startDate,
    endDate,
    language,
    provider,
    durationInWeeks,
    level,
  } = query;

  const sortCriteria: any = {};
  sortCriteria[sortBy] = sortOrder === 'asc' ? 1 : -1;

  const filter: any = {};

  if (minPrice && maxPrice) {
    filter.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
  }

  if (tags) {
    filter['tags.name'] = Array.isArray(tags) ? { $in: tags } : tags;
  }

  if (startDate) {
    filter.startDate = {
      $gte: startDate,
    };
  }

  if (endDate) {
    filter.endDate = {
      $lte: endDate,
    };
  }

  if (language) {
    filter.language = language;
  }

  if (provider) {
    filter.provider = provider;
  }

  if (durationInWeeks) {
    filter.durationInWeeks = { $eq: parseInt(durationInWeeks, 10) };
  }

  if (level) {
    filter['details.level'] = level;
  }

  const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

  const courses = await Course.find(filter)
    .populate({
      path: 'createdBy',
      select: '-passwordHistory -createdAt -updatedAt -passwordChangedAt -__v',
    })
    .sort(sortCriteria)
    .skip(skip)
    .limit(parseInt(limit, 10))
    .select('-__v');

  const total = await Course.countDocuments(filter);

  return {
    meta: {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      total,
    },
    courses,
  };
};
export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  getSingleCourseWithReviewsFromDB,
  getBestCourseFromDB,
  getPaginatedAndFilteredCoursesFromDB,
};
