import React from 'react';
import { Link } from 'react-router-dom';
import placeHolder from '../../assets/placeholder_for_moviePosters.png';
import './navFrom-style.css';

const NavForm = (props) => {
	let poster = placeHolder;

	let searchedList = props.searchedMovies.map((movies, i) => {
		if (movies.poster_path) {
			poster = `https://image.tmdb.org/t/p/w500/${movies.poster_path}`;
		}

		return (
			<div
				className='searchedList'
				key={i}
				onClick={() => {
					props.searchMovieById(movies.id);
					props.searchSimilarMoviesById(movies.id);
					props.setVisibility('displaySearchedMovies');
				}}
			>
				<Link to='/movieInfo' style={{ textDecoration: 'none' }}>
					<div>
						<img src={poster} alt='' width='10%' />
						<h5>{movies.original_title}</h5>
					</div>
				</Link>
			</div>
		);
	});

	return (
		<form className='form-inline'>
			<div className='navFromContainer'>
				<input
					className='form-control mr-sm-2 '
					type='search'
					placeholder='Keyword'
					aria-label='Search'
					onChange={() => {
						const input = document.querySelector('input').value;
						props.searchMovies(input);
					}}
				/>
				{props.displaySearchedMovies && <div className='dropdownInput'>{searchedList}</div>}
			</div>
		</form>
	);
};

NavForm.defaultProps = {
	searchMovies          : [],
	searchedMovies        : [],
	displaySearchedMovies : false
};

export default NavForm;
