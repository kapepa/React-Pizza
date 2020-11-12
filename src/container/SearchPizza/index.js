import React from 'react';
import './style.scss';
import { Categories, Sorting} from '../index';
import { connect } from 'react-redux';
import { Pizza } from '../../redux/action/index';
import { pizza } from '../../network/index';

function SearchPizza(props){
	const { categoryList, sortList, sort, category, load, dispatch} = props
	const claimPizzas = async function(arum){
		dispatch(Pizza.revealPizza(false))
		const newProps = Object.assign({category,sort},arum)
		const list = await pizza.all(newProps);
		dispatch(Pizza.loadedPizza(list))
		dispatch(Pizza.findProps(newProps))
		dispatch(Pizza.revealPizza(true))
	}
	return (load && 
		<div className="content__top">
			<Categories list = { categoryList } claim = {claimPizzas} asset = {category}/>
			<Sorting sortList = { sortList } claim = {claimPizzas} asset = {sort}/>
		</div>
	)
}

export default connect((state) => {
	return {categoryList: state.pizza.categoryList, sortList: state.pizza.sortList, sort: state.pizza.sort, category: state.pizza.category, load: state.pizza.load}
})(React.memo(SearchPizza, (prevProsp, nextProps) => {
	return !(prevProsp.categoryList.length !== nextProps.categoryList.length || prevProsp.sortList.length !== nextProps.sortList.length || prevProsp.category !== nextProps.category || prevProsp.sort !== nextProps.sort)
}))
