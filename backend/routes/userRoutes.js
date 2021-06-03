import express from 'express'
const router = express.Router()
import {isAuthenticatedUser, isAdmin} from '../middleware/authMiddleware.js'
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  getUsers,
  deleteUser,
  getUserById,
  updateUser
} from '../controllers/userController.js'

router.route('/login').post(authUser)
router.route('/register').post(registerUser)
router.route('/me/profile').get(isAuthenticatedUser, getUserProfile)
router.route('/me/update').put(isAuthenticatedUser, updateUserProfile)
router.route('/password/update').put(isAuthenticatedUser, updateUserPassword)

// Admin routes
router.route('/users').get(isAuthenticatedUser, isAdmin, getUsers)
router.route('/user/:id').get(isAuthenticatedUser, isAdmin, getUserById)
                         .put(isAuthenticatedUser, isAdmin, updateUser)
                         .delete(isAuthenticatedUser, isAdmin, deleteUser)
                        
export default router