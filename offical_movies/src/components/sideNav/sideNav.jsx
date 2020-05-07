import React from 'react';
import MovieContext from '../../movieContext';

import './sideNav-style.css';

const SideNav = () => (
	<MovieContext.Consumer>
		{(context) => (
			<div className='sideNav p-2'>
				<div className='sideNavCard'>
					<h5>Sort</h5>
					<p>Sort Results By :</p>
					<form
						onChange={() => {
								const selected = document.querySelector('#sortByPop');
								context.sort(selected.value);
							}}>
						<select
							id='sortByPop'
							defaultValue={context.discoverProp}
						
						>
							<option value='popularity.desc'>Popularity</option>
							<option value='release_date.desc'>Release</option>
							<option value='vote_average.desc'>Vote Average</option>
							<option value='original_title.asc'>Title</option>
						</select>
					</form>
				</div>

				<div className='sideNavCard'>
					<h5>Filter</h5>
					<p>Filter Results By :</p>
					<form
					onChange={() => {
								const selected = document.querySelector('#year');
								context.filter(selected.value);
							}}>
						<select
							id='year'
							defaultValue={context.year}
						>
							<option value='2020'>2020</option>
							<option value='2019'>2019</option>
							<option value='2018'>2018</option>
							<option value='2017'>2017</option>
						</select>
					</form>
				</div>
			</div>
		)}
	</MovieContext.Consumer>
);

export default SideNav;
