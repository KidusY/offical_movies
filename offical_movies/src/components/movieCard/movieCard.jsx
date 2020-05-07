import React from 'react';
import { Link } from 'react-router-dom';
import MovieContext from '../../movieContext';
import placeHolder from '../../assets/placeholder_for_moviePosters.png';
import './movie-style.css';

const MoveCard = (props) => (
	<MovieContext.Consumer>
		{(context) => (
			<Link to='/movieInfo' style={{ textDecoration: 'none' }}>
				<div
					className='col-md-6 col-sm-12 col-lg-4  col-xl-3 pt-5'
					onClick={() => {
						context.getUrlInfo(props);
						context.searchMovieById(props.movie.id);
						context.searchSimilarMoviesById(props.movie.id);
						context.searchReview(props.movie.id);
					}}
				>
					<div className='card'>
						{
							!props.movie.poster_path ? <img
								src={placeHolder}
								alt={props.movie.original_title}
								className='img-fluid'
								style={{ width: '500px', height: '315px' }}
							/> :
							<img
								src={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`}
								alt={props.movie.original_title}
								className='img-fluid'
							/>}

						<div className='card-body'>
							<h6 className='text-left'>{props.movie.original_title}</h6>
							<p className='text-left'>{props.movie.release_date}</p>
						</div>
					</div>
				</div>
			</Link>
		)}
	</MovieContext.Consumer>
);

export default MoveCard;
