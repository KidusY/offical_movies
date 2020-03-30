import React, { Component } from 'react';
import Nav from './components/Nav/Navbar';
import axios from 'axios';
import './App.css';
import logo from './assets/Group 1.png';
import MovieList from './components/movieList/movieList';
import MovieInfo from './components/movieInfo/movieInfo';
import NavForm from './components/navForm/navFrom';
import SideNav from './components/sideNav/sideNav';

import $ from '../node_modules/jquery/dist/jquery.slim';
//const youtubeAPI = 'AIzaSyDWTSqy5Sv7bssZMkyigyhUd_9488z5oNE';

const discoverUrl = 'https://api.themoviedb.org/3/discover/movie';
const trending = 'https://api.themoviedb.org/3/trending/all/day';

class App extends Component {
	constructor () {
		super();
		this.state = {
			movies        : [],
			discover      : [],
			discoverProp  : 'popularity.desc',
			pageNo        : '1',
			year          : 2020,
			trending      : [],
			title         : "What's Popular",
			searchField   : '',
			movieInfo     : {},
			similarMovies : [],
			videos        : [],
			showMovieList : true,
			showMovieInfo : false
		};
	}
	componentDidMount () {
		this.discoverMovies();
	}
	//discover movies by popularity
	discoverMovies = () => {
		const params = {
			api_key              : '7dd3ecbc408396caf9897c0d584666c0',
			sort_by              : this.state.discoverProp,
			primary_release_year : this.state.year,
			page                 : this.state.pageNo
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
				this.setState({ discover: results });
				this.setState({ movies: this.state.discover });
			});
	};
	//search movie videos
	searchMovieVideo = async (id) => {
		let response;
		console.log(id);
		try {
			response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
				params : {
					api_key : '7dd3ecbc408396caf9897c0d584666c0'
				}
			});
			this.setState({
				videos :
					response ? response.data.results :
					[]
			});
		} catch (err) {
			console.log('this is the error: ', err);
		}
	};
	//search similar movies
	searchSimilarMoviesById = async (id) => {
		let response;
		try {
			response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar`, {
				params : {
					api_key : '7dd3ecbc408396caf9897c0d584666c0'
				}
			});
			console.log('similar: ', response.data);

			this.setState({
				similarMovies :
					response ? response.data.results :
					[]
			});
		} catch (err) {
			console.log(err);
		}
	};
	//searches movie by ID and gets info about a specific movie
	searchMovieById = async (id) => {
		let response;

		try {
			response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
				params : {
					api_key : '7dd3ecbc408396caf9897c0d584666c0'
				}
			});
			this.searchSimilarMoviesById(id);
			//	this.searchMovieVideo(id);
			this.setState({ movieInfo: response.data, showMovieList: false, showMovieInfo: true });
		} catch (err) {
			console.log(err);
		}
	};
	//search for trending movies
	trending = async () => {
		let response;
		try {
			response = await axios.get(`${trending}`, {
				params : {
					api_key : '7dd3ecbc408396caf9897c0d584666c0'
				}
			});
			console.log('treading: ', response.data);

			this.setState({
				trending : response.data.results
			});
			this.setState({
				movies : this.state.trending,
				title  : "What's Trending"
			});
		} catch (err) {
			console.log(err);
		}

		console.log(this.state.movies);
	};
	//sort discover movies that needs to be displayed
	sort = async (sort) => {
		const Sort = await sort;
		this.setState({ discoverProp: Sort });
		this.discoverMovies();
		console.log(this.state.discoverProp);
	};
	//filter by year
	filter = async (yr) => {
		console.log(yr);
		const year = await yr;
		this.setState({ year: year });
		this.discoverMovies();
		console.log(this.state.year);
	};

	//discovers btn function
	discover = async () => {
		this.setState({ movies: this.state.discover, title: "What's Popular" });
	};
	//sets the visibility  for the movie list in the state
	setVisibility = () => {
		this.setState({ showMovieList: true, showMovieInfo: false });
	};

	//updates the search input inside the state
	searchMovies = (input) => {
		this.setState({
			searchField : input.toLowerCase()
		});
	};

	//change page
	changePage = async (page) => {
		const Page = await page;
		let PageNo = parseInt(this.state.pageNo);

		if (Page == 'Prev' && this.state.pageNo > 1) {
			PageNo--;
		}
		else {
			PageNo++;
		}

		this.setState({ pageNo: `${PageNo}` });
		this.discoverMovies();
	};

	render () {
		return (
			<div className='App'>
				<nav className='navbar navbar-light '>
					<a className='navbar-brand' href='/some/valid/uri'>
						<img src={logo} alt={logo} />
					</a>
					<NavForm searchMovies={this.searchMovies} />
				</nav>

				<Nav discover={this.discover} trending={this.trending} />

				{this.state.showMovieList && (
					<div className='homePage d-sm-flex'>
						<div className='sideNavContainer'>
							<h1 className='text-white m-3'>{this.state.title}</h1>
							<SideNav sort={this.sort} filter={this.filter} />
						</div>

						<MovieList
							movies={this.state.movies}
							searchMovieById={this.searchMovieById}
							pageNo={this.state.pageNo}
							changePage={this.changePage}
						/>
					</div>
				)}

				{this.state.showMovieInfo && (
					<div>
						<MovieInfo
							MovieInfo={this.state.movieInfo}
							similarMovies={this.state.similarMovies}
							videos={this.state.videos}
							searchMovieById={this.searchMovieById}
							setVisibility={this.setVisibility}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default App;
