import React from 'react';
import MovieCard from '../movieCard/movieCard';
import './movie-style.css';
const MovieList = (props) => {
	return (
		<div className='row container movieList'>
			{props.movies.map((movie) => (
				<MovieCard movie={movie} key={movie.id} searchMovieById={props.searchMovieById} />
			))}

			<div className='mx-auto mt-5 d-inline-flex'>
				<button
					className='btn btn-primary'
					onClick={() => {
						props.changePage('Prev');
					}}
				>
					Prev
				</button>
				<p className='mx-2 mt-3'>{props.pageNo}</p>
				<button
					className='btn btn-primary'
					onClick={() => {
						props.changePage('Next');
					}}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default MovieList;
