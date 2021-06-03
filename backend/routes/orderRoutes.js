import express from 'express'
const router = express.Router()
import {
  addNewOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  deleteOrder
} from '../controllers/orderController.js'
import {isAuthenticatedUser, isAdmin} from '../middleware/authMiddleware.js'

router.route('/order/new').post(isAuthenticatedUser, addNewOrder)
router.route('/orders/me').get(isAuthenticatedUser, getMyOrders)
router.route('/order/:id').get(isAuthenticatedUser, getOrderById)
router.route('/order/:id/pay').put(isAuthenticatedUser, updateOrderToPaid)

router.route('/order/:id/deliver').put(isAuthenticatedUser, isAdmin, updateOrderToDelivered)
router.route('/admin/orders').get(isAuthenticatedUser, isAdmin, getOrders)
router.route('/admin/order/:id').delete(isAuthenticatedUser, isAdmin, deleteOrder)

export default router
