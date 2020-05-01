import React from 'react';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import './movieTrailers-style.css';

const MovieTrailers = (props) => (
	<div>
		{console.log(props)}
		<h2 className='text-white'> Related Videos </h2>
		<button
			className='btn btn-danger mr-5 closeBtn'
			onClick={() => {
				props.history.goBack();
			}}
		>
			X
		</button>
		<div className='movieTrailers container'>{props.movieTrailers}</div>
	</div>
);

export default MovieTrailers;
