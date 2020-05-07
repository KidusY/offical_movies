import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MovieContext from './movieContext';
import Nav from './components/Nav/Navbar';
import axios from 'axios';
import './App.css';
import logo from './assets/Group 1.png';
import MovieList from './components/movieList/movieList';
import MovieInfo from './components/movieInfo/movieInfo';
import NavForm from './components/navForm/navFrom';
import config from './config';
import MovieTrailer from './components/movieTrailers/movieTrailers';
import YouTube from 'react-youtube';
import TvShows from './components/TvShows/Tvshows';

import $ from '../node_modules/jquery/dist/jquery.slim';

const api_key = config.API_KEY;
let urlInfo = {};

const discoverUrl = 'https://api.themoviedb.org/3/discover/movie';
const trending = 'https://api.themoviedb.org/3/trending/all/day';

class App extends Component {
	constructor () {
		super();
		this.state = {
			movies                : [],
			TvShows               : [],
			discover              : [],
			discoverProp          : 'popularity.desc',
			pageNo                : '1',
			year                  : 2020,
			trending              : [],
			title                 : "What's Popular",
			reviews               : [],
			searchedMovies        : [],
			displaySearchedMovies : false,
			movieInfo             : {},
			similarMovies         : [],
			videos                : [],
			movieCast             : [],
			urlLocation           : ''
		};
	}
	componentDidMount () {
		this.discoverMovies();
	}
	//discover movies by popularity
	discoverMovies = () => {
		const params = {
			api_key              : api_key,
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
	//discover Tv shows
	discoverTvShows = async () => {
		let response;
		try {
			response = await axios.get(`https://api.themoviedb.org/3/discover/tv`, {
				params : {
					api_key             : api_key,
					sort_by             : this.state.sort,
					first_air_date_year : this.state.year
				}
			});
		} catch (err) {
			console.log('Search Tv shows error: ', err);
		}
		this.setState({
			TvShows : response.data.results
		});
		console.log(this.state.TvShows);
	};
	//search movie videos
	searchMovieVideo = async (id) => {
		let ID;
		let response;

		try {
			ID = await id;
			response = await axios.get(`https://api.themoviedb.org/3/movie/${ID}/videos`, {
				params : {
					api_key : api_key
				}
			});
		} catch (err) {
			console.log('Search movie video: ', err);
		}
		this.setState({
			videos            : response.data.results,
			showMovieTrailers : true
		});
	};
	//get review
	searchReview = async (id) => {
		let ID;
		let response;

		try {
			ID = await id;
			response = await axios.get(`https://api.themoviedb.org/3/movie/${ID}/reviews`, {
				params : {
					api_key : api_key
				}
			});
		} catch (err) {
			console.log('Search movie video: ', err);
		}

		this.setState({
			reviews : response.data.results
		});
	};
	//search similar movies
	searchSimilarMoviesById = async (id) => {
		const Id = await id;
		let response;
		try {
			response = await axios.get(`https://api.themoviedb.org/3/movie/${Id}/similar`, {
				params : {
					api_key : api_key
				}
			});

			this.setState({
				similarMovies :
					response ? response.data.results :
					[]
			});
		} catch (err) {
			console.log('Search similar movies by id: ', err);
		}
	};
	//search movie cast
	searchMovieCast = async (id) => {
		let Id;
		let response;

		try {
			Id = await id;
			response = await axios.get(`https://api.themoviedb.org/3/movie/${Id}/credits`, {
				params : {
					api_key : api_key
				}
			});

			//this.searchSimilarMoviesById(id);
		} catch (err) {
			console.log('Search movie cast: ', err);
		}

		this.setState({ movieCast: response.data.cast });
	};
	//searches movie by ID and gets info about a specific movie
	searchMovieById = async (id) => {
		let Id;
		let response;

		try {
			Id = await id;
			response = await axios.get(`https://api.themoviedb.org/3/movie/${Id}`, {
				params : {
					api_key : api_key
				}
			});
			this.setState({ movieInfo: response.data, showMovieList: false, showMovieInfo: true });
			this.searchMovieCast(id);
		} catch (err) {
			console.log('Search movie by id: ', err);
		}
	};
	//search for trending movies
	trending = async () => {
		let response;
		try {
			response = await axios.get(`${trending}`, {
				params : {
					api_key : api_key
				}
			});

			this.setState({
				trending : response.data.results
			});
			this.setState({
				movies : this.state.trending,
				title  : "What's Trending"
			});
		} catch (err) {
			console.log('trending: ', err);
		}
	};
	//sort discover movies that needs to be displayed
	sort = async (sort) => {
		const Sort = await sort;
		this.setState({ discoverProp: Sort });
		this.discoverMovies();
		this.discoverTvShows();
	};
	//filter by year
	filter = async (yr) => {
		const year = await yr;
		this.setState({ year: year });
		this.discoverMovies();
		this.discoverTvShows();
	};

	//discovers btn function
	discover = async () => {
		this.setState({ movies: this.state.discover, title: "What's Popular" });
	};
	//sets the visibility  for the movie list in the state
	setVisibility = (state = '') => {
		if (state === 'showMovieTrailers') {
			this.setState({ showMovieTrailers: false, showMovieInfo: true });
		}
		else if (state === 'displaySearchedMovies') {
			this.setState({ displaySearchedMovies: false });
		}
		else {
			this.setState({ showMovieList: true, showMovieInfo: false });
		}
	};

	//updates the search input inside the state
	searchMovies = async (input) => {
		let Input;
		let response;

		try {
			Input = await input;
			response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
				params : {
					api_key : api_key,
					query   : Input
				}
			});

			this.setState({ searchedMovies: response.data.results });
		} catch (err) {
			console.log('Search Movie Error: ', err);
		}

		if (this.state.searchedMovies) {
			this.setState({ displaySearchedMovies: true });
		}
		if (Input.length === 0) {
			this.setState({ displaySearchedMovies: false });
		}
	};
	//get the url info that is derived from the routes
	getUrlInfo = (props) => {
		urlInfo = props;
	};

	//change page
	changePage = async (page) => {
		const Page = await page;
		let PageNo = parseInt(this.state.pageNo);

		if (Page === 'Prev' && this.state.pageNo > 1) {
			PageNo--;
		}
		else {
			PageNo++;
		}

		this.setState({ pageNo: `${PageNo}` });
		this.discoverMovies();
	};
	opts = {
		allowfullscreen : true,
		playerVars      : {
			playsinline : 0
		}
	};

	render () {
		const movieTrailers = this.state.videos.map((video, i) => (
			<div className='movieTrailerItems' key={i}>
				<div>
					<YouTube videoId={`${video.key}`} opts={this.opts} />
					<h6 className='text-white'>{video.name}</h6>
				</div>
			</div>
		));
		const value = {
			MovieInfo               : this.state.movieInfo,
			similarMovies           : this.state.similarMovies,
			videos                  : this.state.videos,
			movies                  : this.state.movies,
			pageNo                  : this.state.pageNo,
			title                   : this.state.title,
			discoverProp            : this.state.discoverProp,
			year                    : this.state.year,
			reviews                 : this.state.reviews,
			TvShows                 : this.state.TvShows,
			searchMovieById         : this.searchMovieById,
			setVisibility           : this.setVisibility,
			searchSimilarMoviesById : this.searchSimilarMoviesById,
			searchMovieVideo        : this.searchMovieVideo,
			movieCast               : this.state.movieCast,
			filter                  : this.filter,
			sort                    : this.sort,
			changePage              : this.changePage,
			getUrlInfo              : this.getUrlInfo,
			searchReview            : this.searchReview
		};
		return (
			<MovieContext.Provider value={value}>
				<div className='App'>
					<nav className='navbar navbar-light '>
						<a className='navbar-brand' href='/'>
							<img src={logo} alt={logo} />
						</a>
						<NavForm
							searchMovies={this.searchMovies}
							searchedMovies={this.state.searchedMovies}
							displaySearchedMovies={this.state.displaySearchedMovies}
							searchMovieById={this.searchMovieById}
							searchSimilarMoviesById={this.searchSimilarMoviesById}
							setVisibility={this.setVisibility}
						/>
					</nav>
					<Nav
						discover={this.discover}
						trending={this.trending}
						TvShows={this.discoverTvShows}
						urlLocation={urlInfo}
					/>
					<div className='d-sm-flex mainContainer'>
						<div>
							<Route
								exact
								path='/'
								component={(props) => {
									return <MovieList {...props} />;
								}}
							/>
						</div>
					</div>
					<Route exact path='/movieInfo' component={(props) => <MovieInfo {...props} />} />
					<Route
						path='/Trailers'
						component={(props) => <MovieTrailer {...props} movieTrailers={movieTrailers} />}
					/>
					<Route path='/TvShows' component={(props) => <TvShows {...props} />} />
				</div>
			</MovieContext.Provider>
		);
	}
}

export default App;

/*

	<MovieInfo
								{...props}
							MovieInfo={this.state.movieInfo}
							similarMovies={this.state.similarMovies}
							videos={this.state.videos}
							searchMovieById={this.searchMovieById}
							setVisibility={this.setVisibility}
							searchSimilarMoviesById={this.searchSimilarMoviesById}
							searchMovieVideo={this.searchMovieVideo}
							movieCast={this.state.movieCast}
							/>




							<MovieList
							movies={this.state.movies}
							searchMovieById={this.searchMovieById}
							searchSimilarMoviesById={this.searchSimilarMoviesById}
							searchMovieVideo={this.searchMovieVideo}
							pageNo={this.state.pageNo}
							changePage={this.changePage}
						/>


*/
