import CategoryModel from "../../DB/models/category.model.js";

export const createCategory = async (data) => await CategoryModel.create(data);

export const findCategories = async (categories) => await CategoryModel.find(categories);
  
export const findCategoryById = async (id) => await CategoryModel.findById(id);

export const findCategoryAndDelete = async (id) => await CategoryModel.findByIdAndDelete(id);