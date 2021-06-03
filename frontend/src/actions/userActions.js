import api from '../utils/api'
import {
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  CLEAR_ERRORS
} from '../constants/userConstants'
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const { data } = await api.post(
      '/login',
      { email, password }
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data.message
    })
  }
}

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const { data } = await api.post(
      '/register',
      userData
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data.message  
    })
  }
}

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    })

    const { data } = await api.get('/me/profile')

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data.user,
    })
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
    })
  }
}

// Update profile
export const updateUserProfile = (userData) => async (dispatch) => {
    try {

        dispatch({ type: USER_UPDATE_PROFILE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await api.put('/me/update', userData, config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Logout user
export const logout = () => async (dispatch) => {

    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    
    dispatch({type: USER_LOGOUT})
    dispatch({type: ORDER_LIST_MY_RESET})

}

// User List - ADMIN
export const listUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    })

    const { data } = await api.get(`/users`)

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message = error.response.data.message
    dispatch({
      type: USER_LIST_FAIL,
      payload: message,
    })
  }
}

// Delete user - ADMIN
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    })

    const { data } = await api.delete(`/user/${id}`)

    dispatch({ 
        type: USER_DELETE_SUCCESS,
        payload: data.success
     })

  } catch (error) {
    const message = error.response.data.message
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message,
    })
  }
}

// Get user details - Admin
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const { data } = await api.get(`/user/${id}`)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    })
  } catch (error) {
    const message = error.response.data.message

    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    })
  }
}

// Update user - admin
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    })

    const { data } = await api.put(`/user/${id}`, userData)

    dispatch({ 
        type: USER_UPDATE_SUCCESS,
        payload: data.success
    })

  } catch (error) {
    const message = error.response.data.message

    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message,
    })
  }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}