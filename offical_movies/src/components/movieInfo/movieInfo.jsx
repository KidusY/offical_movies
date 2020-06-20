import React from 'react';
import './movie-style.css';
import MovieContext from '../../movieContext';
import Carousel from '../carousel/carousel';
import left from '../../assets/left.png';
import right from '../../assets/right.png';
import placeHolder from '../../assets/placeholder_for_moviePosters.png';
import profileImg from '../../assets/placeholder-profile-male-500x500.png';
import axios from 'axios'

import Slider from 'react-slick';

class MovieInfo extends React.Component {
	stateContainer = {
		similarMovies : [],
		movieCast     : [],
		style         : [],
		review        : [],
		
	};
	getMoviesInfo = (
		similarMovies,
		MovieCast,
		searchMovieById,
		searchSimilarMoviesById,
		searchMovieVideo,
		movieInfo,
		review
	) => {
		this.stateContainer.similarMovies = similarMovies.map((movie, i) => (
			<Carousel
				movie={movie}
				key={i}
				searchMovieById={searchMovieById}
				searchSimilarMoviesById={searchSimilarMoviesById}
				searchMovieVideo={searchMovieVideo}
			/>
		));
		this.stateContainer.movieCast = MovieCast.map((cast, i) => {
			let movieCastPoster = profileImg;
			if (cast.profile_path) {
				movieCastPoster = `https://image.tmdb.org/t/p/w500/${cast.profile_path}`;
			}

			return (
				<div className='col-md-3' key={i}>
					<img className='mx-auto' src={movieCastPoster} alt='profileImg' />
					<h5>{cast.name}</h5>
					<p>{cast.character}</p>
				</div>
			);
		});
		this.stateContainer.style = {
			background       : `linear-gradient(rgba(74, 74, 74, 0.8), rgba(74, 74, 74, 0.8))
		,url(https://image.tmdb.org/t/p/w500/${movieInfo.backdrop_path})`,
			backgroundSize   : 'cover',
			backgroundRepeat : 'no-repeat',
			padding          : '50px'
		};
		if (review.length !== 0) {
			this.stateContainer.review = review.map((reviewer, i) => (
				<div className='review container' key={i}>
					<h5> {reviewer.author} </h5>
					<p>{reviewer.content}</p>
				</div>
			));
		}
		else {
			this.stateContainer.review = 'No Reviews';
		}
	};

	addMovieToFav =(movieInfo)=>{
	const{	id,
			backdrop_path,
			poster_path,
			imdb_id,
			original_language,
			original_title,
			overview,
			tagline,
			vote_average,
			release_date
		} = movieInfo;
		const movieinfo ={	id,
			backdrop_path,
			poster_path,
			imdb_id,
			original_language,
			original_title,
			overview,
			tagline,
			vote_average,
			release_date
		}
		axios.post("http://localhost:8000/movies/favorites",movieinfo).then(res=>console.log(res));
	}

	render () {
		const options = {
			dots           : true,
			infinite       : true,
			speed          : 1500,
			pauseOnHover   : true,
			autoplay       : true,
			slidesToShow   : 6,
			slidesToScroll : 1,
			responsive     : [
				{
					breakpoint : 1024,
					settings   : {
						slidesToShow   : 6,
						slidesToScroll : 3,
						infinite       : true,
						dots           : true
					}
				},
				{
					breakpoint : 600,
					settings   : {
						slidesToShow   : 2,
						slidesToScroll : 2,
						initialSlide   : 2
					}
				},
				{
					breakpoint : 480,
					settings   : {
						slidesToShow   : 1,
						slidesToScroll : 1
					}
				}
			]
		};

		return (
			<MovieContext.Consumer>
				{(context) => (
					<div>
						{this.getMoviesInfo(
							context.similarMovies,
							context.movieCast,
							context.searchMovieById,
							context.searchSimilarMoviesById,
							context.searchMovieVideo,
							context.MovieInfo,
							context.reviews
						)}
						

						<div className='movieInfo-card' style={this.stateContainer.style}>
							{
								!context.MovieInfo.poster_path ? <img
									src={placeHolder}
									alt={context.MovieInfo.original_title}
								/> :
								<img
									src={`https://image.tmdb.org/t/p/w500/${context.MovieInfo.poster_path}`}
									alt={context.MovieInfo.original_title}
								/>}

							<div className='description'>
								<h1>{context.MovieInfo.original_title}</h1>{' '}
								<span>
									{' '}
									<strong>Release Date:</strong> {context.MovieInfo.release_date}
								</span>{' '}
								<br />
								<span>
									<strong>Language:</strong> {context.MovieInfo.original_language}
								</span>
								<p>{context.MovieInfo.overview}</p>
								<p>
									<strong>TagLine:</strong> {context.MovieInfo.overview}{' '}
								</p>
								<span>
									<strong>Rating:</strong> {context.MovieInfo.vote_average}
								</span>
								<div>
									<button
										className='btn btn-secondary btn-lg float-left mt-3'
										onClick={() => {
											context.searchMovieVideo(context.MovieInfo.id);
											this.props.history.push('/Trailers');
										}}
									>
										Trailers
									</button>
								
									<button
										className='btn btn-secondary btn-lg float-left mt-3 ml-5'
										onClick={() => {
											this.addMovieToFav(context.MovieInfo);
										}}
									>
										fav
									</button>
								</div>
							</div>

							<button
								className='btn btn-danger mt-3 closeBtn'
								onClick={() => this.props.history.push('/')}
							>
								X
							</button>
						</div>

						{context.similarMovies.length && (
							<div>
								<h2 className='text-white'>Similar Movies</h2>
								<div className='sliderContainer'>
									<div className='left' onClick={() => this.slider.slickPrev()}>
										{' '}
										<img src={left} alt='Prev' />{' '}
									</div>
									<Slider ref={(c) => (this.slider = c)} {...options}>
										{this.stateContainer.similarMovies}
									</Slider>
									<div className='right' onClick={() => this.slider.slickNext()}>
										{' '}
										<img src={right} alt='next' />{' '}
									</div>
								</div>
							</div>
						)}
						{context.movieCast.length && (
							<div className='movieCast'>
								<h2 className='text-white mt-3'>Top cast</h2>
								<div className='row container'>{this.stateContainer.movieCast}</div>
							</div>
						)}
						<div className='reviewContainer container'>
							<h2>Reviews</h2>
							{this.stateContainer.review}
						</div>
					</div>
				)}
			</MovieContext.Consumer>
		);
	}
}

export default MovieInfo;

/*

	




*/
