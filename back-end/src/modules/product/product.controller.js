import slugify from "slugify";
import cloudinary from "../../utils/cloudinary.js";
import { findCategoryById } from "../../repository/categoryRepo.js";
import {createProduct, findProductAndDelete, findProductById} from "../../repository/productRepo.js";
import { paginateQuery } from "../../utils/pagination.js";
import ProductModel from "../../../DB/models/product.model.js";

export const create = async (req, res) =>{
    const {name, categoryId, discount, price} = req.body;
    
    const checkCategory = await findCategoryById(categoryId);
    try{
        if(!checkCategory){
            return res.status(404).json({message : 'category not found'});
        }
          
        
        req.body.slug = slugify(name);
        
        const {secure_url, public_id} = await cloudinary.uploader.upload(req.files.mainImage[0].path, {folder : `${process.env.APP_NAME}/products/${name}`});
        if(!req.files){
            return res.status(400).json({message : "no files uploaded"});
        }
        
        req.body.subImages = [];
        if(req.files.subImages){
            for(const file of req.files.subImages){
                const {secure_url, public_id} = await cloudinary.uploader.upload(file.path, {folder : `M-Shop/products/${name}/subImages`});
                req.body.subImages.push({secure_url, public_id});
            }
        }
        req.body.mainImage = {secure_url, public_id};
        req.body.createdBy = req.id;
        req.body.updatedBy = req.id;

        if(discount){
            req.body.priceAfterDiscount = price - (price * (discount / 100));
        } else{
            req.body.priceAfterDiscount = price;
        }
        req.body.priceAfterDiscount = price - (price * ((discount || 0) / 100));
        const product = await createProduct(req.body);
        return res.status(201).json({message : "success", product});
    }catch(err){
        return res.status(500).json({message : err.message});
    }
}

export const getProducts = async (req, res) => {
    try {

        const filter = {}; 

        const result = await paginateQuery(
            ProductModel,
            filter,
            req,
            'name mainImage price discount createdBy categoryId'
        );

        const products = await ProductModel.populate(result.data, [
            {
                path: 'createdBy',
                select: 'username email'
            },
            {
                path: 'categoryId',
                select: 'name'
            }
        ]);

        return res.status(200).json({
            message: "success",
            products,
            pagination: result.pagination,
            userRole: req.role 
        });
    } catch (err) {
        console.error("Error fetching products:", err);
        return res.status(500).json({ 
            message: "Failed to fetch products",
            error: err.message 
        });
    }
};


export const getProductDetails = async (req, res) =>{
    const {id} = req.params;
    const product = await findProductById(id); 

    return res.status(200).json({message : 'success', product});
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = await findProductById(id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    if (req.role !== 'admin' && String(product.createdBy) !== String(req.id)) {
        return res.status(403).json({ message: 'Not authorized' });
    }
    const discount = Number(req.body.discount ?? 0);
    product.name = req.body.name ?? product.name;
    product.description = req.body.description ?? product.description;
    product.price = req.body.price ?? product.price;
    product.discount = discount;
    product.priceAfterDiscount = product.price - (product.price * (product.discount / 100));
    product.updatedBy = req.id;

    await product.save();
    return res.status(200).json({ message: 'success', product });
};

export const deleteProduct = async (req, res) =>{
    const {id} = req.params;
    const product = await findProductById(id);
    if(!product){
        return res.status(404).json({message : 'product not found'});
    }
    
    if (req.role !== 'admin' && String(product.createdBy) !== String(req.id)) {
        return res.status(403).json({ message: 'Not authorized' });
    }
    await findProductAndDelete(id);
    
    await cloudinary.uploader.destroy(product.mainImage.public_id); 
    for(const image of product.subImages){
        await cloudinary.uploader.destroy(image.public_id); 
    }

    return res.status(200).json({message : 'success'});
}