const initialState = {
	type: null,
	size: null,
	pizzas: [],
	categoryList: [],
	sortList: [],
	load: false,
	loadPizza: false,
	category: false,
	sort: 0
};

export default function(state = initialState, action){
	switch(action.type){
		case "BEGIN_LOADED_PIZZA":
			return Object.assign({...state},{pizzas:[...action.payload], loadPizza: true});
		case "REVEAL_PIZZA_LOADE":
			return {...state, loadPizza: action.payload};
		case "FIND_PROPS_PIZZA":
			return {...state, ...action.payload};
		case "PRELOADE_PROPERTY_PIZZA":
			return {...state, ...action.payload, load: true}
		default: 
			return state;
	}
}




