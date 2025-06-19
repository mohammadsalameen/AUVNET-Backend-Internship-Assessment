import OrderModel from "../../DB/models/order.model.js";

export const createOrder = async (
  userId,
  products,
  couponName,
  address,
  phoneNumber,
  totalPrice
) =>
  await OrderModel.create(
    userId,
    products,
    couponName,
    address,
    phoneNumber,
    totalPrice
  );

  export const findOrders = async (filter = {}) => await OrderModel.find(filter).populate('products.productId');

  export const findOrderById = async (id) => await OrderModel.findById(id);

  export const findOrder = async (id, status, data) => OrderModel.findOne(id, status, data);
