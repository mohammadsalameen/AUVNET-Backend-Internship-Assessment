import mongoose, { model, Schema, Types } from "mongoose";

const productSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        min : 3,
        max : 20
    },
    description : {
        type : String,
        required : true,
    },
    stock : {
        type : Number,
        default : 1
    },
    price : {
        type : Number,
        required : true
    },
    discount : {
        type : Number,
        default : 0
    },
    priceAfterDiscount : {
        type : Number
    },
    slug : {
        type : String,
        required : true
    },
    mainImage : {
        type : Object,
        required : true
    },
    subImages : [
        {
            type : Object,
        }
    ],
    status : {
        type : String,
        default : 'active',
        enum : ["active", "not_active"]
    },
    createdBy : {
        type : Types.ObjectId,
        ref : 'User'
    },
    colors : [String],
    sizes : [
        {
            type : [String],
            enum : ['small', 'medium', 'large', 'xlarge']
        }
    ],
    updatedBy : {
        type : Types.ObjectId,
        ref : 'User'
    },
    categoryId : {
        type : Types.ObjectId,
        ref : 'Category'
    },
}, {
    timestamps : true,
    toJSON : {
        virtuals : true
    },
    toObject : {
        virtuals : true
    }
});

productSchema.virtual('reviews', {
    ref : 'Review',
    localField : '_id',
    foreignField : 'productId'
});

const ProductModel = mongoose.models.Product || model('Product', productSchema);
export default ProductModel;