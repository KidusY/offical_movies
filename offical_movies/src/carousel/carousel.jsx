import React from 'react';
import './carousel.css';

const Carousel = ({ movie }) => (
	<div className='item'>
		<img className="img"src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='' />
	</div>
);

export default Carousel;
