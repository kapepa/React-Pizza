const initialStore = {
	totalPrice: 330,
	totalPurchase: 3,
	purchase: {
		3:{
			name:"Кисло-сладкий цыпленок",
			imageUrl: "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/af553bf5-3887-4501-b88e-8f0f55229429.jpg",
			традиционное: {
				26: {
					count: 1,
					price: 330,
					worth: 330,
				},
				32: {
					count: 2,
					price: 430,
					worth: 860,
				},
				cost: 1190,
				quantity: 3,
			},
			fullCost: 1190,
			fullQuatity: 3
		},
	},
	typeName: ["традиционное"]
}

function establishSumm(obj){
	let allgoods = 0;
	let totalPrice = 0;
	const typeNameNew = [...obj.typeName];
	Object.keys(obj.purchase).forEach((el) => {
		let fullQuatity = 0;
		let fullCost = 0;
		typeNameNew.forEach((key) => {
			if(obj.purchase[el][key]){
				let currentQuantity = 0;
				let currentPrice = 0;
				Object.values(obj.purchase[el][key]).forEach((item) => {
					if(item.hasOwnProperty("count") && item.hasOwnProperty("price")){
						let worthAll = 0;
						worthAll = item.count * item.price;
						currentQuantity += item.count;
						currentPrice += worthAll;
						item.worth = worthAll;
					}
				})
				obj.purchase[el][key].cost = currentPrice;
				obj.purchase[el][key].quantity = currentQuantity;
				fullQuatity += currentQuantity;
				fullCost += currentPrice;
			}
		})
		obj.purchase[el].fullCost = fullCost;
		obj.purchase[el].fullQuatity = fullQuatity;
		allgoods += fullQuatity;
		totalPrice += fullCost;
	})
	return {...obj, totalPrice, totalPurchase: allgoods}
}

export default function(state = initialStore, action){
	switch(action.type){
		case "ADDITION_PURCHASE_TO_CART" :
			const uniqueIndex = action.payload.id;
			const typeNameNew = [...state.typeName];
			const amount = state.purchase.hasOwnProperty(uniqueIndex) && state.purchase[uniqueIndex][action.payload.type] && state.purchase[uniqueIndex][action.payload.type][action.payload.size] ? ++ state.purchase[uniqueIndex][action.payload.type][action.payload.size].count : 1 ;
			if(!typeNameNew.includes(action.payload.type) ) typeNameNew.push(action.payload.type) ;
			const newState = {...state, typeName: typeNameNew, purchase: {
				...state.purchase,
				[uniqueIndex] : { 
					...state.purchase[uniqueIndex], 
					name: action.payload.name, 
					imageUrl: action.payload.imageUrl, 
					[action.payload.type]: state.purchase[uniqueIndex] ? 
						{ ...state.purchase[uniqueIndex][action.payload.type], [action.payload.size]:{count: amount, price: action.payload.price} } : 
						{ [action.payload.size]:{count: amount, price: action.payload.price} }
				},
			}}
			return establishSumm(newState);
		case "FULL_CLEAR_CART":
			return action.payload;
		case "REMOVE_PURCHASE_CART":
			const removePurchaseState = {...state};
			const del = {...removePurchaseState.purchase[action.payload.id][action.payload.type]};
			delete del[action.payload.size];
			removePurchaseState.purchase[action.payload.id][action.payload.type] = del
			return establishSumm(removePurchaseState);
		case "CHANGE_PURCHASE_CART":
			const changePurchaseState = {...state};
			let calc = changePurchaseState.purchase[action.payload.id][action.payload.type][action.payload.size].count
			action.payload.action ? calc ++ : calc -- ;
			changePurchaseState.purchase[action.payload.id][action.payload.type][action.payload.size].count = calc > 1 ? calc : 1 ;
			return establishSumm(changePurchaseState)
		default: 
			return state;
	}
}