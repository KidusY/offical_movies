import React from 'react';

const NavForm = (props) => (
	<form className='form-inline'>
		<input
			className='form-control mr-sm-2'
			type='search'
			placeholder='Search'
			aria-label='Search'
			onChange={() => {
				const input = document.querySelector('input').value;
				props.searchMovies(input);
			}}
		/>
	</form>
);

export default NavForm;
