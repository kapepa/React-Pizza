import React, { useState, useEffect } from 'react';
import './style.scss';
import ClassNames from 'classnames';

function Sorting(props){
	const { sortList, claim, asset} = props;
	const [select, setSelect] = useState({appear: false});
	const revela = sortList.find( el => el.index === asset);
	const changeSelector = function(obj){setSelect({appear: false}); claim(obj)};
	const selectorList = sortList.map((el,i) => {return (<li onClick = {changeSelector.bind(null,{sort: el.index})} className = {ClassNames({"active": asset === el.index})} key = {`${el.name}-${i}`}>{el.name}</li>)});
	const selectAppear = function(e){
		if(e.target.dataset.select === "property"){
			select.appear ? setSelect({...select, appear: false}) : setSelect({...select, appear: true})
		}
	}

	useEffect(function(){
		document.body.addEventListener("click",function(e){
			const classList = [];
			let target = e.target;
			if(select.appear){
				(()=>{
					while(target.parentElement.tagName !== "BODY"){
						classList.push(target.className);
						target = target.parentElement;
					}
				})()
				if(!classList.includes("sort")) setSelect({...select, appear: false})
			}
		})
	},[select])

	return (
		<div className="sort" onClick = {selectAppear}>
			<div className="sort__label">
				<svg
					className = {ClassNames({"sort__label-angle-spin": select.appear})}
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
						fill="#2C2C2C"
					/>
				</svg>
				<b>Сортировка по:</b>
				<span data-select = {"property"}>{revela.name}</span>
			</div>
			{
				select.appear && sortList &&
				<div className="sort__popup">
					<ul>
						{selectorList}
					</ul>
				</div>
				}
		</div>
	)
}

export default React.memo(Sorting, (prevProps, nextProps) => {
	return !(prevProps.asset !== nextProps.asset)
});