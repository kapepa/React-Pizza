/* eslint-disable no-useless-constructor */
import React from 'react';
import { ContentPizza, SearchPizza } from '../../container/index'
import './style.scss';
import { Pizza } from '../../redux/action/index';
import { useDispatch } from 'react-redux'
import { pizza } from '../../network/index';

function Home (){
	const dispatch = useDispatch()
	React.useEffect(() => {
		(async function(){
			const pizzas = await pizza.all({category: false, sort: 0});
			dispatch(Pizza.loadedPizza(pizzas))
		})()
	},[dispatch])

	return (
		<div className="container">
			<SearchPizza />
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				<ContentPizza />
			</div>
		</div>
	)
}

export default React.memo(Home)
