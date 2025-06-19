import OrderModel from "../../../DB/models/order.model.js";
import ProductModel from "../../../DB/models/product.model.js";
import { findCart, updateCart } from "../../repository/cartRepo.js";
import { findCoupon, updateCoupon } from "../../repository/couponRepo.js";
import {  createOrder, findOrderById, findOrders } from "../../repository/orderRepo.js";
import { findProduct, updateProduct } from "../../repository/productRepo.js";
import { findUserById } from "../../repository/userRepo.js";
import {  paginateQuery } from "../../utils/pagination.js";

export const create = async (req, res) => {
    const {couponName} = req.body;

    const cart = await findCart({userId : req.id});
    if(!cart){
        return res.status(404).json({message : 'cart not found'});
    }

    if(couponName){
        const coupon = await findCoupon({name : couponName});
        if(!coupon){
            return res.status(404).json({message : 'coupon not found'});
        }
        if(coupon.expireDate < new Date()){
            return res.status(400).json({message : 'coupon expired'});
        }
        if(coupon.usedBy.includes(req.id)){
            return res.status(400).json({message : 'coupon already used'});
        }
        req.body.couponName = coupon;
    }

    const finalProducts = [];
    let subTotal = 0;
    for(let product of cart.products){
        const checkProduct = await findProduct({_id : product.productId, stock : {$gte : product.quantity}});
        if(!checkProduct){
            return res.status(400).json({message : 'product quantity not available'});
        }
        product = product.toObject(); //convert bson to json
        product.productName = checkProduct.name;
        product.unitPrice = checkProduct.priceAfterDiscount;
        product.totalPrice = checkProduct.priceAfterDiscount * product.quantity; 
        subTotal += product.totalPrice;
        finalProducts.push(product);
    }
    const user = await findUserById(req.id);
    if(!req.body.address){
        req.body.address = user.address;
    }
    if(!req.body.phoneNumber){
        req.body.phoneNumber = user.phoneNumber;
    }
    const order = await createOrder({
        userId : req.id,
        products : finalProducts,
        couponName : couponName ?? '',
        address : req.body.address,
        phoneNumber : req.body.phoneNumber,
        totalPrice : subTotal - (subTotal * ((req.body.coupon?.amount || 0)) / 100),
    });

    // decrease product stock
    for(const product of cart.products){
        await ProductModel.updateOne({_id : product.productId},{
            $inc : {stock : -product.quantity}
        })
    }

    // update coupon usedBy
    if(req.body.couponName){
        await updateCoupon({_id : coupon._id}, {
            $addToSet : {usedBy : req.id}
        });
    }

    await updateCart({userId : req.id}, {
        products : []
    }
    )
    return res.status(201).json({message : 'success', order});
}

export const getUserOrder = async (req, res) => {
    const orders = await findOrders({userId : req.id})

    return res.status(200).json({message : 'success', orders});
}

export const getOrdersByStatus = async (req, res) => {
    const result = await paginateQuery(
      OrderModel,
      { status: req.params.status }, 
      req, 
      null, 
      { path: 'userId', select: 'userName email' }
    );
  
    return res.status(200).json({
      message: "success",
      orders: result.data,
      pagination: result.pagination
    });
  };
  


export const changeOrderStatus = async (req, res) => {
    const {orderId} = req.params;
    const order = await findOrderById(orderId);
    if(!order){
        return res.status(404).json({message : 'order not found'});
    }
    if(order.status == 'delivered'){
        return res.status(400).json({message : 'can not change status of delivered order'});
    }
    order.status = req.body.status;
    order.updatedBy = req.id;
    await order.save();

    if(req.body.status == 'canceled'){
        for(const product of order.products){
            await updateProduct({_id : product.productId},{
                $inc : {stock : product.quantity}
            })
        }
    }

    if(req.body.coupon){
        await updateCoupon({_id : order.couponName}, {
            $pull : {usedBy : req.id}
        });
    }
    return res.status(200).json({message : 'success'});
}