import {
    SIGNUP_START,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_START,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    AUTH_ERROR,
    LOGOUT_SUCCESS
} from '../types'


const initialState = {
    email : '',
    name : '',
    _id : '',
    token: null,
    requestingLogin : false,
    signedUp : false,
    requestingSignup : false,
    loggedIn : false,
    students : null
}

  export default function(state = initialState, action) {
    switch (action.type) {
      case SIGNUP_START:
        return {
          ...state,
          requestingSignup: true
        };
      case SIGNUP_SUCCESS:
        return {
          ...state,
          requestingSignup: false,
          signedUp : true
        };
      case LOGIN_START:
          return {
              ...state,
              requestingLogin : true
          } 
      case LOGIN_SUCCESS:
          return {
              ...state,
              requestingLogin : false,
              token : action.payload.data["token"],
              loggedIn : true,
              email : action.payload.data["email"],
              name : action.payload.data["name"],
              _id : action.payload.data["_id"],
              students : action.payload.data["students"]
          }
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT_SUCCESS:
      case SIGNUP_FAIL:
        return {
          ...state,
          token: null,
          email : '',
          name : '',
          _id : '',
          students : null,
          requestingLogin: false,
          requestingSignup: false,
          loggedIn : false,
          signedUp : false
        };
      default:
        return state;
    }
  }