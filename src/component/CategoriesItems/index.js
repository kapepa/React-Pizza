import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function CategoriesItems(props){
	const { name, active, claim, asset } = props;
	return(
		<li className = { classNames({"active": active}) } onClick = { claim.bind(null, {category: asset}) }>{ name }</li>
	)
}

CategoriesItems.propTypes = {
	name: PropTypes.string,
	func: PropTypes.func,
	asset: PropTypes.number
}

export default React.memo(CategoriesItems, (prevProps, nextProps) => {
	return !(prevProps.active !== nextProps.active)
});