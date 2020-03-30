import React from 'react';
import './Navbar.css';

const Nav = (props) => (
	<ul className='nav nav-tabs'>
		<li className='nav-item'>
			<button className='nav-link active' onClick={() => props.discover()}>
				Discover
			</button>
		</li>
		<li className='nav-item dropdown'>
			<a
				className='nav-link dropdown-toggle'
				data-toggle='dropdown'
				href='/some/valid/uri'
				role='button'
				aria-haspopup='true'
				aria-expanded='false'
			>
				Dropdown
			</a>
			<div className='dropdown-menu'>
				<a className='dropdown-item' href='/some/valid/uri'>
					Action
				</a>
				<a className='dropdown-item' href='/some/valid/uri'>
					Another action
				</a>
				<a className='dropdown-item' href='/some/valid/uri'>
					Something else here
				</a>
				<div className='dropdown-divider' />
				<a className='dropdown-item' href='/some/valid/uri'>
					Separated link
				</a>
			</div>
		</li>
		<li className='nav-item'>
			<button className='nav-link' onClick={() => props.trending()}>
				Trending
			</button>
		</li>
		<li className='nav-item'>
			<a className='nav-link disabled' href='/some/valid/uri' aria-disabled='true'>
				Disabled
			</a>
		</li>
	</ul>
);

export default Nav;
