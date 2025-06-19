import UserModel from "../../DB/models/user.model.js";

export const findUserByEmail = async (email) =>
  await UserModel.findOne({ email });

export const createUser = async (userName, email, hashedPassword) =>
  await UserModel.create({ userName, email, password: hashedPassword });

export const updateUser = async (filter, update) =>
  await UserModel.findOneAndUpdate(filter, update, { new: true });

export const findUserById = async (id) => await UserModel.findById(id);

export const createAdminByDefault = async (data) => await UserModel.create(data);
