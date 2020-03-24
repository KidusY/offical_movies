import React, { Component } from 'react';
import Nav from './Nav/Navbar';
import axios from 'axios';
import './App.css';
import logo from './assets/Group 1.png';
import MovieList from './movieList/movieList';
import MovieInfo from './movieInfo/movieInfo';

import $ from '../node_modules/jquery/dist/jquery.slim';

const discoverUrl = 'https://api.themoviedb.org/3/discover/movie';

class App extends Component {
	constructor () {
		super();
		this.state = {
			movies        : [],
			searchField   : '',
			movieInfo     : {},
			similarMovies : [],
			showMovieList : true,
			showMovieInfo : false
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
	//search similar movies
	searchSimilarMoviesById = async (id) => {
		let response;
		try {
			response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar`, {
				params : {
					api_key : '7dd3ecbc408396caf9897c0d584666c0'
				}
			});
		} catch (err) {
			console.log(err);
		}

		this.setState({ similarMovies: response.data.results });
	};
	//searches movie by ID and gets info about a specific movie
	searchMovieById = async (id) => {
		let response;
		this.setState({ showMovieList: false, showMovieInfo: true });
		try {
			response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
				params : {
					api_key : '7dd3ecbc408396caf9897c0d584666c0'
				}
			});
		} catch (err) {
			console.log(err);
		}
		this.searchSimilarMoviesById(id);
		this.setState({ movieInfo: response.data });
	};

	render () {
		const { movies, searchField } = this.state;
		const filteredMovies = movies.filter((movie) => movie.original_title.toLowerCase().includes(searchField));

		return (
			<div className='App'>
				<nav className='navbar navbar-light '>
					<a className='navbar-brand' href='/some/valid/uri'>
						<img src={logo} alt={logo} />
					</a>
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
				<h1 className='text-white'>Discover</h1>
				{this.state.showMovieList && (
					<MovieList movies={filteredMovies} searchMovieById={this.searchMovieById} />
				)}
				{this.state.showMovieInfo && (
					<div>
						<MovieInfo
							MovieInfo={this.state.movieInfo}
							similarMovies={this.state.similarMovies}
							length={this.state.similarMovies.length}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default App;
