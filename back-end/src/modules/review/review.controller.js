import { findOrder } from "../../repository/orderRepo.js";
import { createReview } from "../../repository/reviewRepo.js";

export const create = async (req, res) => {
    const {userId} = req.id;
    const {productId} = req.params;
    const {comment, rating} = req.body;

    const order = await findOrder({UserId : userId, status : 'delivered', 'products.productId': productId});
    if (!order) {
        return res.status(404).json({message: 'order not found'});
    }

    const review = await createReview({
        createdBy : userId,
        productId,
        comment,
        rating
    });
    if(!review){
        return res.status(400).json({message: 'failed to create review'});
    }

    return res.status(201).json({message: 'success', review});
}