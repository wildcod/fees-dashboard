import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore,compose,applyMiddleware} from 'redux'
import reducer from '../src/redux/reducer/index'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'


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

const store = createStore(reducer,composeEnhancers(applyMiddleware(logger,thunk)))

ReactDOM.render( 
    <Provider store={store}>
      <App />
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
