import React from 'react';
import MovieContext from '../../movieContext';
import SideNav from '../sideNav/sideNav';

import MovieCard from '../movieCard/movieCard';
import './movie-style.css';
const MovieList = (props) => {
	return (
		<MovieContext.Consumer>
			{(context) => (
				<div>
					{context.getUrlInfo(props)}
					<div className="d-sm-flex">
						<div className="homePage">
							<div className="sideNavContainer">
								<h1 className="text-white m-3">{context.title}</h1>
								<SideNav />
							</div>
						</div>
						
						{!!context.movies ? (
							<div className="row container movieList">
							
								{context.movies.map((movie) => {
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
						) : (
							<h1>Loading...</h1>
						)}
					</div>
					<div className="mx-auto mt-5 d-inline-flex text-white">
						<button
							className="btn btn-primary"
							onClick={() => {
								context.changePage('Prev');
							}}
						>
							Prev
						</button>
						<p className="mx-2 mt-3">{context.pageNo}</p>
						<button
							className="btn btn-primary"
							onClick={() => {
								context.changePage('Next');
							}}
						>
							Next
						</button>
					</div>
				</div>
			)}
		</MovieContext.Consumer>
	);
};

export default MovieList;
