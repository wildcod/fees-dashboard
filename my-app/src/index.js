import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore,compose,applyMiddleware} from 'redux'
import rootReducer from '../src/redux/reducer/index'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import { PersistGate } from 'redux-persist/integration/react'
import  expireReducer from 'redux-persist-expire';



const persistConfig = {
    key: 'root',
    storage,
    // transforms :[
    //     expireReducer('errorStore', {
    //         expireSeconds: 180,
    //         expiredState: {
    //             msg: {},
    //             status: null,
    //             id: null
    //         },
    //         autoExpire: true
    //     }),
    //     expireReducer('authStore', {
    //         expireSeconds: 1800,
    //         expiredState: {
    //             email : '',
    //             name : '',
    //             _id : '',
    //             token: null,
    //             requestingLogin : false,
    //             signedUp : false,
    //             requestingSignup : false,
    //             loggedIn : false,
    //             students : [],
    //         },
    //         autoExpire: true
    //     })
    // ]
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)


const logger = store => {
    return next => {
        return action => {
             console.log("[Middleware] Dispatching" , action);
             const result = next(action);
             console.log("[Middleware] next state" , store.getState())
             
             return result;
        }
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer,composeEnhancers(applyMiddleware(logger,thunk)))
let persistor = persistStore(store)

ReactDOM.render( 
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
             <App />
        </PersistGate>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
