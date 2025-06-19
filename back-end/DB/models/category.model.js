import mongoose, { model, Schema, Types } from "mongoose";

const categorySchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        min : 3,
        max : 20
    },
    slug : {
        type : String,
        required : true
    },
    parentCategory : {
        type : Types.ObjectId,
        ref : 'Category',
        default : null
    },
    image : {
        type : Object
    },
    status : {
        type : String,
        default : 'active',
        enum : ["active", "not_active"]
    },
    createdBy : {
        type : Types.ObjectId,
        ref : 'User'
    },
    updatedBy : {
        type : Types.ObjectId,
        ref : 'User'
    }
}, {
    timestamps : true
});

const CategoryModel = mongoose.models.Category || model('Category', categorySchema);
export default CategoryModel;