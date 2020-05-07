import React from 'react';
import './Navbar.css';

const Nav = (props) => (
	<ul className='nav nav-tabs'>
		<li className='nav-item'>
			<button
				className='nav-link '
				onClick={() => {
					if (props.urlLocation) {
						props.urlLocation.history.push('/');
					}
					props.discover();
				}}
			>
				Discover
			</button>
		</li>
		<li className='nav-item dropdown'>
			<button
				className='nav-link dropdown-toggle'
				data-toggle='dropdown'
				aria-haspopup='true'
				aria-expanded='false'
			>
				Tv shows
			</button>
			<div className='dropdown-menu'>
				<a
					className='dropdown-item'
					href='/TvShows'
					onClick={(e) => {
						e.preventDefault();
						props.urlLocation.history.push('/TvShows');
						props.TvShows();
					}}
				>
					Discover
				</a>
				<a className='dropdown-item' href='/some/valid/uri'>
					Another action
				</a>
				<a className='dropdown-item' href='/some/valid/uri'>
					Something else here
				</a>

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
	</ul>
);

export default Nav;
