import React, { Component } from 'react';
import Nav from './Nav/Navbar';
import './App.css';
import MovieList from './movieList/movieList';

import $ from '../node_modules/jquery/dist/jquery.slim';

const discoverUrl = 'https://api.themoviedb.org/3/discover/movie';
class App extends Component {
	constructor () {
		super();
		this.state = {
			movies      : [],
			searchField : '',
			movieClone  : []
		};
	}
	componentDidMount () {
		const params = {
			api_key : '7dd3ecbc408396caf9897c0d584666c0',
			sort_by : 'popularity.desc',
			year    : '2020',
			page    : '1'
		};
		const param = $.param(params);
		const newUrl = `${discoverUrl}?${param}`;
		fetch(newUrl)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.then((resJson) => {
				const results = resJson.results;
				this.setState({ movies: results });
			});
	}

	render () {
		const { movies, searchField } = this.state;
		const filteredMovies = movies.filter((movie) => movie.original_title.toLowerCase().includes(searchField));
		return (
			<div className='App'>
				<nav className='navbar navbar-light '>
					<a className='navbar-brand'>OfficalMovies</a>
					<form className='form-inline'>
						<input
							className='form-control mr-sm-2'
							type='search'
							placeholder='Search'
							aria-label='Search'
							onChange={() => {
								const input = $('input').val().trim();
								this.setState({ searchField: input.toLowerCase() });
							}}
						/>
						<button className='btn btn-outline-success my-2 my-sm-0' type='submit'>
							Search
						</button>
					</form>
				</nav>
				<Nav />
				<MovieList movies={filteredMovies} />
			</div>
		);
	}
}

export default App;
