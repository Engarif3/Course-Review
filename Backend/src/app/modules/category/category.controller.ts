import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { CategoryServices } from './category.service';

const createCategory = catchAsync(async (req, res) => {
  const category = req.body;
  category.createdBy = req.user._id;

  const { _id, name, createdBy, createdAt, updatedAt } =
    await CategoryServices.createCategoryIntoDB(category);

  res.status(200).json({
    success: true,
    statusCode: 201,
    message: 'Category created successfully',
    data: {
      _id,
      name,
      createdBy,
      createdAt,
      updatedAt,
    },
  });
});

const getAllCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoryFromDB();

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Categories retrieved successfully',
    // data: { categories: result },
    data: { categories: result },
  });
});

const getSingleCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const result = await CategoryServices.getSingleCategoryFromDB(categoryId);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category  retrieved successfully',
    data: result,
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategory,
  getSingleCategory,
};
