import React from 'react';
import MovieContext from '../../movieContext';
import SideNav from '../sideNav/sideNav';
import MovieCard from '../movieCard/movieCard';
import './movie-style.css';
const MovieList = (props) => {
	return (
		<MovieContext.Consumer>
			{(context) => (
				<div className='d-sm-flex'>
					<div className='homePage'>
						<div className='sideNavContainer'>
							<h1 className='text-white m-3'>{context.title}</h1>
							<SideNav />
						</div>
					</div>
					<div className='row container movieList'>
						{context.movies.map((movie) => (
							<MovieCard
								movie={movie}
								key={movie.id}
								searchMovieById={context.searchMovieById}
								MovieId={context.movieId}
								searchSimilarMoviesById={context.searchSimilarMoviesById}
							/>
						))}

						<div className='mx-auto mt-5 d-inline-flex'>
							<button
								className='btn btn-primary'
								onClick={() => {
									context.changePage('Prev');
								}}
							>
								Prev
							</button>
							<p className='mx-2 mt-3'>{context.pageNo}</p>
							<button
								className='btn btn-primary'
								onClick={() => {
									context.changePage('Next');
								}}
							>
								Next
							</button>
						</div>
					</div>
				</div>
			)}
		</MovieContext.Consumer>
	);
};

export default MovieList;
