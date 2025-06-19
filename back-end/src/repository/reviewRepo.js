import ReviewModel from "../../DB/models/review.model.js";

export const createReview = async (createdBy, productId, comment, rating) =>
  ReviewModel.create(createdBy, productId, comment, rating);
