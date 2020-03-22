import React from 'react';
import MovieCard from '../movieCard/movieCard';
import './movie-style.css';
const MovieList = (props) => {
	//<MovieCard movie={props.movies[movie]} key={props.movies[movie].original_title} />

	return (
		<div className='row container movieList'>
			{//console.log(props.movies)
			props.movies.map((movie) => <MovieCard movie={movie} />)}
		</div>
	);
};

export default MovieList;
