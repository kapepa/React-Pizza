import { axios } from '../core/index';

const pizza = {
	all: async function(argum){
		const keySort = ["rating","price","name"]
		let urlStr = `?${argum.category !== false? `category=${argum.category}&` : ''}_sort=${keySort[argum.sort]}`
		return axios.get('/pizzas'+urlStr).then(function(response) {
			return response.data;
		})
	},
	category: async function(){
		return axios.get('/category').then(function(response){
			return response.data;
		})
	},
	sort: async function(){
		return axios.get('/sort').then(function(response){
			return response.data;
		})
	},
	type: async function(){
		return axios.get('/type').then(function(response){
			return response.data;
		})
	},
	size: async function(){
		return axios.get('/size').then(function(response){
			return response.data;
		})
	}
}

export default pizza;