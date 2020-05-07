import React from 'react';
import './carousel.css';
import placeHolder from '../../assets/placeholder_for_moviePosters.png';
import MovieContext from '../../movieContext';

const Carousel = ({ movie }) => (
	<MovieContext.Consumer>
		{(context) => (
			<div
				className='item'
				onClick={() => {
					context.searchMovieById(movie.id);
					context.searchReview(movie.id);
				}}
			>
				{
					!movie.poster_path ? <img className='img' src={placeHolder} alt='' /> :
					<img className='img' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='' />}
			</div>
		)}
	</MovieContext.Consumer>
);

export default Carousel;
