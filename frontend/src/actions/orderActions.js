import api from '../utils/api'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  CLEAR_ERRORS
} from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })

    const { data } = await api.post(`/order/new`, order)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })

    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    })
    localStorage.removeItem('cartItems')
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    })
  }
}

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })
    const { data } = await api.get(`/order/${id}`)

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order,
    })
  } catch (error) {
    const message = error.response.data.message
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const payOrder = (orderId, paymentResult) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    })

    const { data } = await api.put(
      `/order/${orderId}/pay`,
      paymentResult
    )

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    })
    
  } catch (error) {
    const message = error.response.data.message

    dispatch({
      type: ORDER_PAY_FAIL,
      payload: message,
    })
  }
}

export const deliverOrder = (order) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    })

    const { data } = await api.put(
      `/order/${order._id}/deliver`,
      {}
    )

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message = error.response.data.message
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload: message,
    })
  }
}

export const listMyOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    })

    const { data } = await api.get(`/orders/me`)

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data.orders,
    })
  } catch (error) {
    const message = error.response.data.message
 
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: message,
    })
  }
}

export const listOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    })

    const { data } = await api.get(`/admin/orders`)

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data.orders,
    })
  } catch (error) {
    const message = error.response.data.message

    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message,
    })
  }
}

// Delete order
export const deleteOrder = (id) => async (dispatch) => {
    try {

        dispatch({ type: ORDER_DELETE_REQUEST })

        const { data } = await api.delete(`/admin/order/${id}`)

        dispatch({
            type: ORDER_DELETE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: ORDER_DELETE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}