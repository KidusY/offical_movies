import React from 'react';
import MovieCard from '../movieCard/movieCard';
import './movie-style.css';
const MovieList = (props) => {
		return (
		<div className='row container movieList'>
			{
			props.movies.map((movie) => (
				<MovieCard movie={movie} key={movie.id} searchMovieById={props.searchMovieById} />
			))}
		</div>
	);
};

export default MovieList;
