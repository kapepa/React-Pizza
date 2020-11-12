import React from 'react';
import './style.scss';
import { ItemsPizza } from '../../component/index';
import { LoadPizza } from '../index';
import { connect } from 'react-redux';
import { Pizza, Cart } from '../../redux/action/index';

function ContentPizza(props){
	const {cart, type, pizzas, size, load, loadPizza, dispatch} = props
	const purchase = function(argum){
		dispatch(Pizza.revealPizza(false))
		const purchase = pizzas.find( el => el.id === argum.id );
		const typeUp = type[argum.type].name;
		const merge = {...argum, imageUrl: purchase.imageUrl, name: purchase.name, type: typeUp};
		dispatch(Cart.purchase(merge));
		dispatch(Pizza.revealPizza(true))
	}
	const pizzaList = pizzas.map( (el,i) => { 
		return ( <ItemsPizza key = {`${el}-${i}`} {...el} typeDesc = { type } sizeDesc = { size } purchase = {purchase} coutnPizza = {cart[el.id] ? cart[el.id].fullQuatity : 0}/> )
	})
	return (loadPizza && load ? pizzaList : <LoadPizza/>)
}

export default connect(function(state){	
	return { cart: state.cart.purchase, loadPizza: state.pizza.loadPizza, type: state.pizza.type, pizzas: state.pizza.pizzas, size: state.pizza.size, load: state.pizza.load}
})(React.memo(ContentPizza, (prevState, nextState) => {
	return !(prevState.pizzas.length !== nextState.loadPizza.length && nextState.load !== false && nextState.loadPizza !== false)
}))
