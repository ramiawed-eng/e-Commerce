import express from 'express';
import Product from '../models/productModel.js';
import asyncHanlder from 'express-async-handler';

const productRoutes = express.Router();

// @desc Fetch all products
// @route GET /api/products
// @access Public
productRoutes.get(
  '/',
  asyncHanlder(async (req, res, next) => {
    const products = await Product.find({});

    // res.status(401);

    // throw new Error('Not Authorized');

    res.json(products);
  })
);

// @desc Fetch single products
// @route GET /api/products/:id
// @access Public
productRoutes.get(
  '/:id',
  asyncHanlder(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  })
);

export default productRoutes;
