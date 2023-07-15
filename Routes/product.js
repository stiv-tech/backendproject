import express from 'express'

import{protect, admin, user} from '../middleware/authMiddleware.js'
import { bestSellerProduct, 
    createProduct, createProductReview, 
    deleteProduct, getAllProduct, 
    getDiscountedProduct, getFeaturedProducts, 
    getNewProduct, getProductId, getProductReview, 
    getRelatedProduct, updateDiscountedProduct, updateProduct } from '../controller/productController.js'
const router = express.Router()


//createProduct (Admin alone)

router.post('/', protect, admin, createProduct);

// get all protect 

router.get('/', getAllProduct);


// get new product

router.get('/new', getNewProduct);

//new Products
router.get("/featured", getFeaturedProducts)

//best seller

router.get('/best', bestSellerProduct);

//get discount product

router.get('/:id/discount', getDiscountedProduct);

// get related product

router.get('/:id/related', getRelatedProduct);

//get single product

router.get('/:id', getProductId);

//updateAProduct

router.put('/:id', protect, admin, updateProduct);

// delete product

router.delete('/:id', protect, admin, deleteProduct)


//update discountedProduct(admin)
router.put('/:id/discount', protect, admin, updateDiscountedProduct)


//create product review(users only)

router.post('/:id/review', protect, user, createProductReview);

//get product review(everyone)

router.get('/:id/all-reviews', getProductReview)



export default router