import { combineReducers, createStore } from 'redux'
import pizza from './pizza'
import cart from './cart';

const todoApp = combineReducers({
	pizza,
	cart,
})

const Store = createStore(todoApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default Store