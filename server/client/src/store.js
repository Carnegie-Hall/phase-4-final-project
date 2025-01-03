import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from '@redux-devtools/extension'

// combine our reducers

const reducer = combineReducers({

})

let initialState = {};

// we're using middleware here to make async functions
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

//once we have added the necessary dependecies to our file we begin to initialize our store 
// we start by creating a store.js File, we proceed with making a initial reducer and leave it blank
// this is because we want to first create the slice(s) that will be stored in our reducer in another File, we do this to separate our code 

export default store;