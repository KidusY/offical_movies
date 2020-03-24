import React from 'react';
import './movie-style.css';
import Carousel from '../carousel/carousel'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';


const MovieInfo = (props) => {
    const moviesListed = props.similarMovies.map((movie, i) => (
        <Carousel movie={movie}/>
    ));
    const options = {
        items: 2,
        autoplay:true,
        nav:true, 
        dot:true, 
        loop:true,
        stagePadding:2,
        lazyLoad:true
    }

    return (
        <div>
		<div className='movieInfo-card'>
			<img
				src={`https://image.tmdb.org/t/p/w500/${props.MovieInfo.poster_path}`}
				alt={props.MovieInfo.original_title}
			/>
			<div className='description'>
				<h1>{props.MovieInfo.original_title}</h1>
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
               </div> 
            <h2 className="text-white">Similar Movies</h2>
            {moviesListed.length && (
                <OwlCarousel className='owl-theme pt-5' options={options} >
						{moviesListed}
					</OwlCarousel>
				)}
        
		</div>
	);
};

export default MovieInfo;
