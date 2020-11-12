const action = {
	purchase: function(data){
		return {
			type: "ADDITION_PURCHASE_TO_CART",
			payload: data
		}
	},
	clear: function(){
		return {
			type: "FULL_CLEAR_CART",
			payload:{
				totalPrice: 0,
				totalPurchase: 0,
				purchase: {},
				typeName: []
			}
		}
	},
	remove: function(data){
		return {
			type: "REMOVE_PURCHASE_CART",
			payload: data,
		}
	},
	change: function(data){
		return {
			type: "CHANGE_PURCHASE_CART",
			payload: data,
		}
	}
}

export default action;