import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import ErrorHandler from '../utils/errorHandler.js'

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
const addNewOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
      return next(new ErrorHandler('No order items', 400))
  } 
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  
})

// @desc    Get order by ID
// @route   GET /api/v1/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if(!order){
        return next(new ErrorHandler('No order found with this ID', 404));
    }

  res.status(200).json({
        success: true,
        order
    });
})

// @desc    Update order to paid
// @route   GET /api/v1/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler('No order found with this ID', 404));
    }

    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.status(200).json(updatedOrder)

})

// @desc    Update order to delivered
// @route   GET /api/v1/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler('No order found with this ID', 404));
    }
  
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.status(200).json(updatedOrder)
})

// @desc    Get logged in user orders
// @route   GET /api/v1/orders/me
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.status(200).json({
        success: true,
        orders
    });
})


// @desc    Get all orders
// @route   GET /api/v1/admin/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })
    
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
})

// @desc    Delete order
// @route   DELETE /api/v1/admin/order/:id
// @access  Private/Admin
const deleteOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler('No order found with this ID', 404));
    }

    await order.remove();

    res.status(200).json({
        success: true
    });
})

export {
  addNewOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  deleteOrder
}