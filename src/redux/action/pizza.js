import { pizza } from '../../network/index';
import Store from '../reducer/index'

const action = {
	loadedPizza: function(obj){
		return { type: "BEGIN_LOADED_PIZZA", payload: obj };
	},
	revealPizza: function(bool){
		return {type: "REVEAL_PIZZA_LOADE", payload: bool}
	},
	findProps: function(obj){
		return { type: "FIND_PROPS_PIZZA", payload: obj}
	},
	preloadProperty: async function(){
		const categoryList = await pizza.category();
		const sortList = await pizza.sort();
		const type = await pizza.type();
		const size = await pizza.size();
		Store.dispatch({ type: "PRELOADE_PROPERTY_PIZZA", payload: {categoryList, sortList, type, size}}) 
	},
}

export default action;