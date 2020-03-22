import React from 'react';
import './Navbar.css';

const Nav = () => (
	<ul className='nav nav-tabs'>
		<li className='nav-item'>
			<a className='nav-link active' href='#'>
				Active
			</a>
		</li>
		<li className='nav-item dropdown'>
			<a
				className='nav-link dropdown-toggle'
				data-toggle='dropdown'
				href='#'
				role='button'
				aria-haspopup='true'
				aria-expanded='false'
			>
				Dropdown
			</a>
			<div className='dropdown-menu'>
				<a className='dropdown-item' href='#'>
					Action
				</a>
				<a className='dropdown-item' href='#'>
					Another action
				</a>
				<a className='dropdown-item' href='#'>
					Something else here
				</a>
				<div className='dropdown-divider' />
				<a className='dropdown-item' href='#'>
					Separated link
				</a>
			</div>
		</li>
		<li className='nav-item'>
			<a className='nav-link' href='#'>
				Link
			</a>
		</li>
		<li className='nav-item'>
			<a className='nav-link disabled' href='#' aria-disabled='true'>
				Disabled
			</a>
		</li>
	</ul>
);

export default Nav;
