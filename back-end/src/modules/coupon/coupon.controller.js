import CouponModel from "../../../DB/models/coupon.model.js";
import {  createCoupon, findCoupon } from "../../repository/couponRepo.js";
import {  paginateQuery } from "../../utils/pagination.js";

export const create = async (req, res) =>{
    const {name, amount} = req.body;
    if(await findCoupon({name : req.body.name})){
        return res.status(409).json({message : "coupon is already exist"});
    }

    req.body.expireDate = new Date(req.body.expireDate);
    req.body.createdBy = req.id;
    req.body.updatedBy = req.id;

    const coupon = await createCoupon(req.body);

    return res.status(201).json({message : "success", coupon});
}

export const getCoupons = async (req, res) => {
    const result = await paginateQuery(
      CouponModel,
      {}, 
      req, 
      'name amount expireDate status'
    );
  
    return res.status(200).json({
      message: "success",
      coupons: result.data,
      pagination: result.pagination
    });
  };