/* eslint-disable no-useless-constructor */
import React from 'react';
import { connect } from 'react-redux';
import "./style.scss";
import { EmptyCart, PurchaseCart } from '../../container/index'
import { Cart as actionCart } from '../../redux/action/index';

function Cart(props){
	const { dispatch, purchase, totalPrice, totalPurchase, typeName } = props
	const clearCart = function(){
		let answer = window.confirm("Вы действительно хотите очистить корзину?");
		if(answer) dispatch(actionCart.clear());
	}
	const removePurchase = function(){
		let answer = window.confirm(`Вы действительно хотите удалить Пиццу ${this.name} ${this.type} размер ${this.size} см`)
		if (answer) dispatch(actionCart.remove(this))
		console.log(purchase)
	}
	const changePurchase = function(){dispatch(actionCart.change(this))}
	
	const content =  Object.keys(purchase).length && totalPurchase && totalPrice? 
		<PurchaseCart 
			changePurchase = {changePurchase}
			removePurchase = {removePurchase}
			clearCart = {clearCart} 
			purchase = {purchase} 
			totalPrice = {totalPrice} 
			totalPurchase = {totalPurchase} 
			typeName = {typeName} /> : 
		<EmptyCart/>;
	return(
		<div className="container container--cart">{content}</div>
	)
}

export default connect((state) => {
	return { purchase: state.cart.purchase, totalPrice: state.cart.totalPrice, totalPurchase: state.cart.totalPurchase, typeName: state.cart.typeName }
})(Cart)
