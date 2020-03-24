import React from 'react';
import './movie-style.css';

const MoveCard = (props) => (
	<div
		className='col-md-4 col-sm-12 col-lg-3  pt-5'
		onClick={() => {
			props.searchMovieById(props.movie.id);
		}}
	>
		<div className='card'>
			<img
				src={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`}
				alt={props.movie.original_title}
				className='img-fluid'
			/>
			<div className='card-body'>
				<h6 className='text-left'>{props.movie.original_title}</h6>
				<p className='text-left'>{props.movie.release_date}</p>
			</div>
		</div>
	</div>
);

export default MoveCard;
