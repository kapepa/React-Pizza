import React from 'react';
import './asset/scss/app.scss';
import { Home, Cart } from './pages/index';
import { Switch, Route } from 'react-router-dom';
import { Headers } from './container/index';
import { connect } from 'react-redux';
import { Pizza } from './redux/action/index';

function App(props){
	const { totalPrice, totalPurchase} = props
	React.useEffect(() => {
		Pizza.preloadProperty()
	},[])
	
	return (
		<div className="App">
			<div className="wrapper">
				<Headers totalPrice = {totalPrice} totalPurchase = {totalPurchase}/>
				<div className="content">
					<Switch>
						<Route path = "/" exact component = {Home}/>
						<Route path = "/cart" exact component = {Cart}/>
					</Switch>
				</div>
			</div>
		</div>
	)
}
export default React.memo(connect((state) => {return { totalPrice: state.cart.totalPrice, totalPurchase: state.cart.totalPurchase}})(App));
