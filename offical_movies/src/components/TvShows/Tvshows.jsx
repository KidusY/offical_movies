import React from 'react';
import './Tvshows-style.css';
import SideNav from '../sideNav/sideNav';
import MovieCard from '../../components/movieCard/movieCard';
import MovieContext from '../../movieContext';

const Tvshows = (props) => {
	return (
		<MovieContext.Consumer>
			{(context) => (
				<div>
					<div className='d-sm-flex'>
						<div className='homePage'>
							<div className='sideNavContainer'>
								<h1 className='text-white m-3'>{context.title}</h1>
								<SideNav />
							</div>
						</div>
						<div className='row container movieList'>
							{context.TvShows.map((movie) => {
								return (
									<MovieCard
										movie={movie}
										key={movie.id}
										searchMovieById={context.searchMovieById}
										MovieId={context.movieId}
										searchSimilarMoviesById={context.searchSimilarMoviesById}
										{...props}
									/>
								);
							})}
						</div>
					</div>
				</div>
			)}
		</MovieContext.Consumer>
	);
};
export default Tvshows;
