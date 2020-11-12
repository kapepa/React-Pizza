import React, { useState } from 'react';
import './style.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function ItemsPizza(props){
	const establishPrice = {
		size: {26: 1, 30: 1.1, 40: 1.25},
		type: {0: 1,1: 1.2}
	}
	const { id, imageUrl, name, price, sizes, types, typeDesc, sizeDesc, purchase, coutnPizza } = props;
	const [state, setState] = useState({id, size: sizes[0], type: types[0], price: parseInt(price) * establishPrice.type[types[0]] * establishPrice.size[sizes[0]]});
	const transformPrice = (price * establishPrice.type[state.type] * establishPrice.size[state.size]).toFixed(0)
	const changeSize = function(e){ 
		setState({...state, size: Number(e.currentTarget.getAttribute("data-size")),price: parseInt((price * establishPrice.type[state.type] * establishPrice.size[Number(e.currentTarget.getAttribute("data-size"))]).toFixed(0))}) 
	};
	const changeType = function(e){ 
		setState({...state, type: Number(e.currentTarget.getAttribute("data-type")),price: parseInt((price * establishPrice.type[Number(e.currentTarget.getAttribute("data-type"))] * establishPrice.size[state.size]).toFixed(0))}) 
	};
	const avalableSize = sizeDesc.map( (el,i) => {return (<li data-size = {el} onClick = {changeSize} className = { classNames({"pizza-block-disabled": !sizes.includes(el), "active": state.size === el})} key = {`${el}-${i}`} >{el} см.</li>)});
	const avalableType = typeDesc.map( (el,i) => {return (<li data-type = {i} onClick = {changeType} className = { classNames({"pizza-block-disabled": !types.includes(i), "active": state.type === i})} key = {`${el.name}-${i}`}>{el.name}</li>)})
	return (
		<div className="pizza-block">
			<img
				className="pizza-block__image"
				src={ imageUrl }
				alt="Pizza"
			/>
			<h4 className="pizza-block__title">{ name }</h4>
			<div className="pizza-block__selector">
				<ul>
					{avalableType}
				</ul>
				<ul>
					{avalableSize}
				</ul>
			</div>
			<div className="pizza-block__bottom">
				<div className="pizza-block__price">от {transformPrice} ₽</div>
				<div onClick = {purchase.bind(null,state)} className="button button--outline button--add">
					<svg
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
							fill="white"
						/>
					</svg>
					<span>Добавить</span>
					<i>{coutnPizza}</i>
				</div>
			</div>
		</div>
	)
}

ItemsPizza.propTypes = {
	imageUrl: PropTypes.string,
	name: PropTypes.string,
	price: PropTypes.number,
	sizes: PropTypes.array,
	types: PropTypes.array,
	purchase: PropTypes.func,
}

export default React.memo(ItemsPizza, (prevProps, nextProps) => {
	return !(prevProps.coutnPizza !== nextProps.coutnPizza);
});