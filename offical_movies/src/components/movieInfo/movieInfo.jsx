import React from 'react';
import './movie-style.css';
import Carousel from '../carousel/carousel';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';

const MovieInfo = (props) => {
	const similarMovies = props.similarMovies.map((movie, i) => (
		<Carousel movie={movie} key={i} searchMovieById={props.searchMovieById} />
	));
	const movieTrailers = props.videos.map((video) => (
		<div className='item'>
			<iframe
				id='player'
				type='text/html'
				width='300'
				height='300'
				title={'Movie'}
				src={`http://www.youtube.com/embed/${video.key}?enablejsapi=1`}
				frameBorder='0'
			/>
			<h6 className='text-white'>{video.name}</h6>
		</div>
	));
	const options = {
		items : 6
	};

	return (
		<div>
			<div className='movieInfo-card'>
				<img
					src={`https://image.tmdb.org/t/p/w500/${props.MovieInfo.poster_path}`}
					alt={props.MovieInfo.original_title}
				/>
				<div className='description'>
					<h1>{props.MovieInfo.original_title}</h1>{' '}
					<span>
						{' '}
						<strong>Release Date:</strong> {props.MovieInfo.release_date}
					</span>{' '}
					<br />
					<span>
						<strong>Language:</strong> {props.MovieInfo.original_language}
					</span>
					<p>{props.MovieInfo.overview}</p>
					<p>
						<strong>TagLine:</strong> {props.MovieInfo.overview}{' '}
					</p>
					<span>
						<strong>Rating:</strong> {props.MovieInfo.vote_average}
					</span>
				</div>

				<button className='btn btn-danger mt-3' onClick={() => props.setVisibility()}>
					{' '}
					Close
				</button>
			</div>

			{similarMovies.length && (
				<div>
					<h2 className='text-white'>Similar Movies</h2>
					<OwlCarousel className='owl-theme pt-3' {...options}>
						{similarMovies}
					</OwlCarousel>

					{movieTrailers.length && (
						<div>
							<h2 className='text-white'> Related Videos </h2>
							<OwlCarousel className='pt-3' {...options}>
								{movieTrailers}
							</OwlCarousel>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default MovieInfo;
