import { createCart, findCart } from "../../repository/cartRepo.js";

export const addToCart = async (req, res) =>{
    const {productId} = req.body;
    const cart = await findCart({userId : req.id}); 
    
    if(!cart){
        const newCart = await createCart({
            userId : req.id,
            products : [{productId}]
        });
        return res.status(201).json({message : 'success', cart : newCart});
    }
    for(let i = 0; i < cart.products.length; i++){
        if(cart.products[i].productId == productId){
            return res.status(409).json({message : 'product already exists in cart'});
        }
    }
    cart.products.push({productId});
    await cart.save();
    return res.status(201).json({message : 'success'});
}