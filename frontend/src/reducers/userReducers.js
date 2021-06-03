import {
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_RESET,
  USER_PROFILE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
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
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PASSWORD_RESET,
  USER_UPDATE_PASSWORD_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_RESET,
  USER_UPDATE_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  CLEAR_ERRORS
} from '../constants/userConstants'

const initialState = {
  token: localStorage.getItem('token') ?? null,
  isAuthenticated: null,
  loading: true,
  user: null
};

export const authReducer = (state = initialState, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
        case USER_REGISTER_REQUEST:
        case USER_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false
            };
        
        case USER_PROFILE_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };

        case USER_LOGIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                isAuthenticated: true,
            };
        
        case USER_PROFILE_FAIL:
        case USER_LOGOUT:
            return {
                ...state,
                token: null,
                loading: false,
                isAuthenticated: false,
                user: null
            };

        case USER_LOGIN_FAIL:
        case USER_REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                token: null,
                error: action.payload
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
}

export const userReducer = (state = {}, action) =>{
    switch (action.type){
        case USER_UPDATE_PROFILE_REQUEST:
        case USER_UPDATE_PASSWORD_REQUEST:
        case USER_UPDATE_REQUEST:
        case USER_DELETE_REQUEST:
            return {
                ...state,
                loading: true
            };

        case USER_UPDATE_PROFILE_SUCCESS:
        case USER_UPDATE_PASSWORD_SUCCESS:
        case USER_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };

        case USER_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            };

        case USER_UPDATE_PROFILE_RESET:
        case USER_UPDATE_PASSWORD_RESET:
        case USER_UPDATE_RESET:
            return {
                ...state,
                isUpdated: false,
            };

        case USER_DELETE_RESET:
            return {
                ...state,
                isDeleted: false
            };

        case USER_UPDATE_PROFILE_FAIL:
        case USER_UPDATE_PASSWORD_FAIL:
        case USER_DELETE_FAIL:
        case USER_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
            
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case USER_LIST_RESET:
      return { users: [] }
    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {

        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }

        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case USER_DETAILS_RESET:
            return { user: {} }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}
