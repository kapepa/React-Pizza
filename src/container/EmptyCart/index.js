import React from 'react';
import { Link } from 'react-router-dom'
import './style.scss';
import EmptyImg from '../../asset/image/empty-cart.png'

function EmptyCart(){
	return (
		<div className="cart cart--empty">
			<h2>Корзина пустая </h2>
			<p>
				Вероятней всего, вы не заказывали ещё пиццу.<br />
				Для того, чтобы заказать пиццу, перейди на главную страницу.
			</p>
			<img src={EmptyImg} alt="Empty cart" />
				<Link to = "/" className="button button--black">
					<span>Вернуться назад</span>
				</Link>
		</div>
	)
}

export default EmptyCart