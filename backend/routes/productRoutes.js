import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  getAdminProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  getTopProducts
} from '../controllers/productController.js'

import {isAuthenticatedUser, isAdmin} from '../middleware/authMiddleware.js'

router.route('/products').get(getProducts);
router.route('/products/top').get(getTopProducts);
router.route('/products/:id').get(getProductById);

router.route('/admin/products').get(isAuthenticatedUser, isAdmin, getAdminProducts);
router.route('/admin/product/:id').delete(isAuthenticatedUser, isAdmin, deleteProduct);
router.route('/admin/product/new').post(isAuthenticatedUser, isAdmin, createProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser, isAdmin, updateProduct);

router.route('/product/:id/review').post(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(isAuthenticatedUser, getProductReviews);
router.route('/reviews').delete(isAuthenticatedUser, deleteReview);


export default router