import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import ErrorHandler from '../utils/errorHandler.js'
import sendToken from '../utils/jwtToken.js'

// @desc    Auth user & get token
// @route   POST /api/v1/login
// @access  Public
const authUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    // Checks if email and password is entered by user
    if(!email || !password){
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    const user = await User.findOne({ email }).select('+password')

    if(!user){
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.matchPassword(password);
    
    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    sendToken(user, 200, res);
})

// @desc    Register a new user
// @route   POST /api/v1/register
// @access  Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    return next(new ErrorHandler('User already exists',400))
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if(!user){
      return next(new ErrorHandler('Invalid user data',400))
  }

  sendToken(user, 200, res)
})

// @desc    Get user profile
// @route   GET /api/v1/me/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(!user){
        return next(new ErrorHandler('User not found',404))
    }

    res.status(200).json({
        success: true,
        user
    })

})

// Update / Change password => /api/v1/password/update
const updateUserPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check previous user password
    const isMatched = await user.matchPassword(req.body.oldPassword);

    if(!isMatched){
        return next(new ErrorHandler('Old password is incorrect', 400));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res);

})

// @desc    Update user profile
// @route   PUT /api/v1/me/update
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    };

    console.log(req.body)

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        user: user
    });

})

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
  res.status(200).json(users)
})

// @desc    Delete user
// @route   DELETE /api/v1/user/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`));
    }

    await user.remove();

    res.status(200).json({
        success: true
    });
})

// @desc    Get user by ID
// @route   GET /api/v1/user/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if(!user){
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user
    });
})

// @desc    Update user
// @route   PUT /api/v1/user/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        isAdmin: req.body.isAdmin
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true
    });
  
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  getUsers,
  deleteUser,
  getUserById,
  updateUser
}