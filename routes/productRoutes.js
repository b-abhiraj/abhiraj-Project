import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import {
    brainTreePaymentController,
    braintreeTokenController,
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    pageListController,
    productCategoryController,
    productCountController,
    productFilterController,
    productPhotoController,
    releatedProductController,
    searchProductController,
    updateProductController
} from '../Controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

router.get('/get-product', getProductController)

router.get('/get-product/:slug', getSingleProductController)

router.get('/product-photo/:pid', productPhotoController)

router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController);

router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

router.post('/product-filter', productFilterController)

router.get('/product-count', productCountController)

router.get('/product-list/:page', pageListController)

router.get('/search/:keyword', searchProductController)

router.get('/related-product/:pid/:cid', releatedProductController)

router.get('/product-category/:slug', productCategoryController)

router.get('/braintree/token', braintreeTokenController)

router.post('/braintree/payment', requireSignIn, brainTreePaymentController)

export default router