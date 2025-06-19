import slugify from "slugify";
import { createCategory, findCategories, findCategoryAndDelete, findCategoryById } from "../../repository/categoryRepo.js";
import { paginateQuery } from "../../utils/pagination.js";
import CategoryModel from "../../../DB/models/category.model.js";

export const create = async (req, res) =>{
    const {name, parentCategory} = req.body;
    req.body.slug = slugify(name);
    req.body.createdBy = req.id;
    req.body.updatedBy = req.id;
    
    const category = await createCategory(req.body);
    return res.status(201).json({message : "success", category});
}

export const getCategories = async (req, res) => {
    const result = await paginateQuery(
      CategoryModel,
      {}, 
      req, 
      'name slug status'
    );
  
    return res.status(200).json({
      message: "success",
      categories: result.data,
      pagination: result.pagination
    });
  };
  


export const getActiveCategories = async (req, res) =>{
    const categories = await findCategories({status : 'active'});
    return res.status(200).json({message : "success", categories});
}

export const getCategoryDetails = async (req, res) =>{
    const {id} = req.params;

    const category = await findCategoryById(id);
    if(!category){
        return res.status(404).json({message : 'category not found'});
    }
    return res.status(200).json({message : 'success', category});

}

export const updateCategory = async (req, res) =>{
    const {id} = req.params;
    const {name} = req.body;
    const userId = req.id;
    
    const category = await findCategoryById(id);
    if(!category){
        return res.status(404).json({message : 'category not found'});
    }

    category.name = name;
    category.slug = slugify(name);
    category.status = req.body.status;
    category.updatedBy = userId;

    await category.save(); //save changes

    return res.status(200).json({message : 'success'});
}

export const removeCategory = async (req, res) =>{
    const {id} = req.params;

    const category = await findCategoryAndDelete(id);
    if(!category){
        return res.status(404).json({message : 'category not found'});
    }
    return res.status(200).json({message : 'success'});
}