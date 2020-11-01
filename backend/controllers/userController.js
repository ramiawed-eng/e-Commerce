import asyncHanlder from 'express-async-handler';
import User from '../models/userModel.js';
import userRoutes from '../routes/userRoutes.js';
import { generateToken } from '../utils/generateToken.js';

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
export const authUser = asyncHanlder(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    const token = generateToken(user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
export const getUserProfile = asyncHanlder(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc update user profile
// @route PUT /api/users/profile
// @access Private
export const updateUserProfile = asyncHanlder(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    const token = generateToken(updatedUser._id);
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc POST user register
// @route GET /api/users
// @access Public
export const registerUser = asyncHanlder(async (req, res, next) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(401);
    throw new Error('User already exist!');
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201);
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});
