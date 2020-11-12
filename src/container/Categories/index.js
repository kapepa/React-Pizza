import React from "react";
import './style.scss';
import { CategoriesItems } from '../../component/index';
import classNames from "classnames";
import PropTypes from "prop-types";

function Categories(props){
	const { list, claim, asset } = props;
	const mapList = list.map( (el,i) => <CategoriesItems key = {`${el.name}-${i}`} asset = {el.index} name = {el.name} active = {asset === el.index} claim = {claim}/>)
	return (
		<div className="categories">
			<ul>
				<li className = { classNames({"active": asset === false})} onClick = { claim.bind(null,{category: false}) }>Все</li>
				{ list && mapList }
			</ul>
		</div>
		)
}

Categories.propTypes = {
	asset: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired
}

export default React.memo(Categories, (preveProps, nextProps) => {
	return !(preveProps.asset !== nextProps.asset)
});