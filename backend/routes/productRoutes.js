import express from 'express';
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';

const productRoutes = express.Router();

// @desc Fetch all products
// @route GET /api/products
// @access Public
productRoutes.route('/').get(getProducts);

// @desc Fetch single products
// @route GET /api/products/:id
// @access Public
productRoutes.route('/:id').get(getProductById);

export default productRoutes;
