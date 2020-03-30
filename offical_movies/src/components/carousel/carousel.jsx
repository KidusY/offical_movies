import React from 'react';
import './carousel.css';

const Carousel = ({ movie, searchMovieById }) => (
	<div
		className='item'
		onClick={() => {
			console.log(movie);
			return searchMovieById(movie.id);
		}}
	>
		<img className='img' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='' />
	</div>
);

export default Carousel;
