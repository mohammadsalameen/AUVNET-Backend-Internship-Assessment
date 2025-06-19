import CouponModel from "../../DB/models/coupon.model.js";

export const findCoupon = async (coupon) => CouponModel.findOne(coupon);

export const createCoupon = async (data) => CouponModel.create(data);
  
export const updateCoupon = async (id, data) => await CouponModel.updateOne(id, data);