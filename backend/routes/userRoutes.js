import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js';
import express from 'express';
import { protect } from '../middlewares/authMiddlewares.js';

const userRoutes = express.Router();

userRoutes.route('/').post(registerUser);
userRoutes.route('/login').post(authUser);
userRoutes
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default userRoutes;
