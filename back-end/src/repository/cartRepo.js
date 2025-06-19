import CartModel from "../../DB/models/cart.model.js";

export const findCart = async (data) => CartModel.findOne(data); 

export const createCart = async (data, products) => await CartModel.create(data, products);

export const updateCart = async (id, data) => await CartModel.updateOne(id, data);