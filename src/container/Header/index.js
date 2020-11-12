import React from 'react';
import './style.scss';
import PizzaLogo from '../../asset/image/pizza-logo.svg';
import { HeaderCart } from '../../component/index';
import { Link } from "react-router-dom";


function Headers(props){
	const { totalPrice, totalPurchase } = props
	return(
		<div className="header">
		<div className="container">
			<div className="header__logo">
				<Link to="/">
					<img width="38" src={PizzaLogo} alt="Pizza logo" />
				</Link>
				<div>
					<Link to = "/">
						<h1>React Pizza</h1>
					</Link>
					<p>самая вкусная пицца во вселенной</p>
				</div>
			</div>
				<Link to="cart">
					<HeaderCart totalPrice = {totalPrice} totalPurchase = {totalPurchase}/>
				</Link>
		</div>
	</div>
	)
}

export default React.memo(Headers) ;