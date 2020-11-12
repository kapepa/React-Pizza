import React from 'react';
import './style.scss';
import ContentLoader from "react-content-loader";
import PropTypes from 'prop-types';

function LoadPizza(props){
	const { coutShadow } = props;
	const shadow = (
		<ContentLoader 
			speed={2}
			width={280}
			height={457}
			viewBox="0 0 280 457"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<circle cx="135" cy="120" r="120" /> 
			<rect x="-2" y="265" rx="5" ry="5" width="280" height="24" /> 
			<rect x="1" y="309" rx="5" ry="5" width="280" height="84" /> 
			<rect x="128" y="413" rx="20" ry="20" width="152" height="44" /> 
			<rect x="0" y="423" rx="5" ry="5" width="92" height="27" /> 
		</ContentLoader>
	)
	return Array(coutShadow).fill(shadow).map(el => <div key={`${Math.random()}-${new Date().getTime()}`} className = "pizza-block">{el}</div> );
}

LoadPizza.propTypes = {
	coutShadow: PropTypes.number.isRequired,
}

LoadPizza.defaultProps = {
	coutShadow: 12
}

export default LoadPizza;