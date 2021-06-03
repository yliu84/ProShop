import generateToken from './generateToken.js'

// Create and send token and save in the cookie
const sendToken = (user, statusCode, res) => {

    // Create JWT token
    const token = generateToken(user._id);

    res.status(statusCode).json({
        success: true,
        token,
        user
    });
}

export default sendToken;