import mongoose, { model, Schema, Types } from "mongoose";

const orderSchema = new Schema({
    userId : {
        type : Types.ObjectId,
        ref : 'User',
        required : true,
    },
    products : [
        {
            productName : {
                type : String,
                required : true
            },
            productId : {
                type : Types.ObjectId,
                ref : 'Product',
                required : true
            },
            quantity : {
                type : Number,
                default : 1,
                required : true
            },
            unitPrice : {
                type : Number,
                required : true
            },
            totalPrice : {
                type : Number,
                required : true
            },
        }
    ],
    couponName : {
        type : String,
    },
    totalPrice : {
        type : Number,
        required : true
    },
    paymentMethod : {
        type : String,
        enum : ["cash", "card"],
        default : "cash"
    },
    phoneNumber : {
        type : String,
        required : true
    },
    status : {
        type : String,
        default : 'pending',
        enum : ["pending", "processing", "shipped", "delivered", "cancelled"]
    },
    note : String,
    reasonRejected : String,
    updatedBy : {
        type : Types.ObjectId,
        ref : 'User'
    }
}, {
    timestamps : true
});

const OrderModel = mongoose.models.Order || model('Order', orderSchema);
export default OrderModel;