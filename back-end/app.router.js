import cors from 'cors'
import connectDB from './DB/connection.js';
import authRouter from './src/modules/auth/auth.router.js'
import categoryRouter from './src/modules/category/category.router.js'
import productRouter from './src/modules/product/product.router.js'
import couponRouter from './src/modules/coupon/coupon.router.js'
import cartRouter from './src/modules/cart/cart.router.js'
import orderRouter from './src/modules/order/order.router.js'
import wishlistRouter from './src/modules/wishlist/wishlist.router.js'
import { createDefaultAdmin } from './src/seeder/adminSeeder.js';

const initApp = async(app, express) =>{
    app.use(express.json());
    app.use(cors());
    connectDB();
    await createDefaultAdmin();
    
    app.use('/auth', authRouter);
    app.use('/categories', categoryRouter);
    app.use('/products', productRouter);
    app.use('/coupons', couponRouter);
    app.use('/carts', cartRouter);
    app.use('/order', orderRouter);
    app.use('/wishlists', wishlistRouter)

    app.get('/', (req, res) =>{
        return res.status(200).json("Welcome ....");
    });
    app.get('*', (req, res) =>{
        return res.status(404).json("page not found");
    });
}
export default initApp;