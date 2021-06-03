import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import ErrorHandler from "../utils/errorHandler.js"
import asyncHandler from 'express-async-handler'

// Checks if user is authenticated or not
const isAuthenticatedUser = asyncHandler( async (req, res, next) => {

    const token = req.header('x-auth-token');

    if(!token){
        return next(new ErrorHandler('No token, authorization denied', 401));
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
            if (error) {
                return next(new ErrorHandler('Token is not valid', 401));
            } else {
                req.user = await User.findById(decoded.id);
                next();
            }
        });
    }
    catch(err){
        console.error('something wrong with auth middleware');
        next(new ErrorHandler('Server Error', 500));        
    }

});

// Handling users roles
const isAdmin = (req, res, next) => {

    if(req.user && req.user.isAdmin){
        next();
    }
    else{
        return next(new ErrorHandler(`You are not allowed to access this resource`, 403));
    }
}

export {
    isAuthenticatedUser,
    isAdmin
}