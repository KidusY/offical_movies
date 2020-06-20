import React from 'react';
import movieContext from '../../movieContext';
import MovieCard from '../movieCard/movieCard';

const favMovies = (props) => {
	return (
		<movieContext.Consumer>
        {
            context=>
			<div className="d-sm-flex">
        
				<div className="row container movieList">
            
					{context.favoriteMovies.map((movie) => {
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
        }
		</movieContext.Consumer>
	);
};
export default favMovies;