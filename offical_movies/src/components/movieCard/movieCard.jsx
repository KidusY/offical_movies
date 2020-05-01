import React from 'react';
import { Link } from 'react-router-dom';
import './movie-style.css';

const MoveCard = (props) => (
	<Link to='/movieInfo'>
		<div
			className='col-md-6 col-sm-12 col-lg-4  col-xl-3 pt-5'
			onClick={() => {
				console.log('Movie Card', props.movie);
				props.searchMovieById(props.movie.id);
				props.searchSimilarMoviesById(props.movie.id);
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
	</Link>
);

export default MoveCard;
