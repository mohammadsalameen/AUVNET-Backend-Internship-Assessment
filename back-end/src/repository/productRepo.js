import ProductModel from "../../DB/models/product.model.js";

export const createProduct = async (data) => await ProductModel.create(data);

export const findProductById = async (id) =>
  await ProductModel.findById(id).select("-discount").populate("reviews");

export const findProductAndDelete = async (id) =>
  await ProductModel.findByIdAndDelete(id);

export const findProduct = async (id, stock) =>
  await ProductModel.findOne(id, stock);

export const updateProduct = async (id, data) =>
  await ProductModel.updateOne(id, data);