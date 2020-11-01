import asyncHanlder from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
export const getProducts = asyncHanlder(async (req, res, next) => {
  const products = await Product.find({});

  res.json(products);
});

// @desc Fetch single products
// @route GET /api/products/:id
// @access Public
export const getProductById = asyncHanlder(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
