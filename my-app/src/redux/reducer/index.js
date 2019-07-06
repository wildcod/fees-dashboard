import {combineReducers} from 'redux'

import AuthReducer from './authReducer'
import ErrorReducer from './errorReducer'

export default combineReducers({
     authStore : AuthReducer,
     errorStore : ErrorReducer
})