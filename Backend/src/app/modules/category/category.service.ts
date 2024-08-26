import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDB = async (categoryData: TCategory) => {
  const result = await Category.create(categoryData);
  return result;
};

const getAllCategoryFromDB = async () => {
  const result = await Category.find()
    .populate({
      path: 'createdBy',
      select: '-passwordHistory -createdAt -updatedAt -passwordChangedAt -__v',
    })
    .select('-__v');
  return result;
};

const getSingleCategoryFromDB = async (id: string) => {
  const result = await Category.findById(id);
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
  getSingleCategoryFromDB,
};
