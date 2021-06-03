import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_RESET,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_RESET,
  PRODUCT_LIST_ADMIN_REQUEST,
  PRODUCT_LIST_ADMIN_SUCCESS,
  PRODUCT_LIST_ADMIN_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_REVIEWS_LIST_REQUEST,
  PRODUCT_REVIEWS_LIST_SUCCESS,
  PRODUCT_REVIEWS_LIST_FAIL,
  PRODUCT_DELETE_REVIEW_REQUEST,
  PRODUCT_DELETE_REVIEW_FAIL,
  PRODUCT_DELETE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  CLEAR_ERRORS
} from '../constants/productConstants'

export const productListReducer = (state = {products: []}, action) => {
    switch (action.type) {
    case PRODUCT_LIST_REQUEST:
    case PRODUCT_LIST_ADMIN_REQUEST:
      return { 
          loading: true, 
          products: [] 
        }
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        pageSize: action.payload.pageSize,
        filteredProductsCount: action.payload.filteredProductsCount
      }

    case PRODUCT_LIST_ADMIN_SUCCESS:
      return {
          loading: false,
          products: action.payload
      }

    case PRODUCT_LIST_FAIL:
    case PRODUCT_LIST_ADMIN_FAIL:
      return { 
          loading: false, 
          error: action.payload 
        }
    
    case CLEAR_ERRORS:
      return {
          ...state,
          error: null
      }
    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { 
          ...state, 
          loading: true 
      }
    case PRODUCT_DETAILS_SUCCESS:
      return { 
          loading: false, 
          product: action.payload 
      }
    case PRODUCT_DETAILS_FAIL:
      return { 
          loading: false, 
          error: action.payload 
      }
    case PRODUCT_DETAILS_RESET:
      return {
        product: { reviews: [] }
      }

    case CLEAR_ERRORS:
      return {
          ...state,
          error: null
      }
    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { 
          loading: true 
      }
    case PRODUCT_DELETE_SUCCESS:
      return { 
          loading: false, 
          isDeleted: action.payload 
      }
    case PRODUCT_DELETE_FAIL:
      return { 
          loading: false, 
          error: action.payload 
      }

    case PRODUCT_DELETE_RESET:
      return{
          ...state,
          isDeleted: false
      }
      
    case CLEAR_ERRORS:
      return {
          ...state,
          error: null
      }
    default:
      return state
  }
}

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {

        case PRODUCT_CREATE_REQUEST:
            return {
                loading: true
            }

        case PRODUCT_CREATE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product
            }

        case PRODUCT_CREATE_FAIL:
            return {
                loading:false,
                error: action.payload
            }

        case PRODUCT_CREATE_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { 
        ...state,
        loading: true 
      }
    case PRODUCT_UPDATE_SUCCESS:
      return { 
        ...state,
        loading: false, 
        isUpdated: action.payload 
      }
    case PRODUCT_UPDATE_FAIL:
      return { 
        ...state,
        loading: false, 
        error: action.payload 
      }
    case PRODUCT_UPDATE_RESET:
      return { 
        ...state,
        isUpdated: false 
      }

    case CLEAR_ERRORS:
      return {
          ...state,
          error: null
      }

    default:
      return state
  }
}

export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {

        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case PRODUCT_CREATE_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case PRODUCT_CREATE_REVIEW_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const productReviewsListReducer = (state = { review: [] }, action) => {
    switch (action.type) {

        case PRODUCT_REVIEWS_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PRODUCT_REVIEWS_LIST_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
            }

        case PRODUCT_REVIEWS_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { 
        loading: true, 
        products: [] 
      }
    case PRODUCT_TOP_SUCCESS:
      return { 
        loading: false, 
        products: action.payload 
      }
    case PRODUCT_TOP_FAIL:
      return { 
        loading: false, 
        error: action.payload 
      }
    case CLEAR_ERRORS:
      return {
          ...state,
          error: null
      }
    default:
      return state
  }
}