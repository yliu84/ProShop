import api from '../utils/api'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_LIST_ADMIN_REQUEST,
  PRODUCT_LIST_ADMIN_SUCCESS,
  PRODUCT_LIST_ADMIN_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  CLEAR_ERRORS
} from '../constants/productConstants'

export const listProducts = (keyword='', currentPage=1, price, category, rating =0) => async (
  dispatch
) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    let link = `/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&rating[gte]=${rating}`

    if(category){
        link = `/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&rating[gte]=${rating}`;
    }

    const { data } = await api.get(link)

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response.data.message
    })
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })

    const { data } = await api.get(`/products/${id}`)

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message
    })
  }
}

export const getAdminProducts = () => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_LIST_ADMIN_REQUEST });

        const { data } = await api.get(`/admin/products`);

        dispatch({
            type: PRODUCT_LIST_ADMIN_SUCCESS,
            payload: data.products
        });

    } catch (error) {

        dispatch({
            type: PRODUCT_LIST_ADMIN_FAIL,
            payload: error.response.data.message
        });
    }
}

// Create new product (Admin)
export const newProduct = (productData) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_CREATE_REQUEST });

        const { data } = await api.post(`/admin/product/new`, productData);

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response.data.message
        });
    }
}

// Update Product (ADMIN)
export const updateProduct = (id, productData) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_UPDATE_REQUEST });

        const { data } = await api.put(`/admin/product/${id}`, productData);

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response.data.message
        });
    }
}


// Delete product (Admin)
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    })

    const { data } = await api.delete(`/admin/product/${id}`)

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: data.success
    })
  } catch (error) {
    const message = error.response.data.message

    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createProductReview = (productId, review) => async (
  dispatch
) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
    })

    const { data } = await api.post(`/product/${productId}/review`, review)

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
      payload: data.success
    })

  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: error.response.data.message
    })
  }
}

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST })

    const { data } = await api.get(`/products/top`)

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
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