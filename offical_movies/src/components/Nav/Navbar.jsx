import React,{useState} from 'react';
import {withRouter} from 'react-router-dom'
import { auth } from '../../firebase.util';
import dummyProfilePic from '../../assets/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg'
import './Navbar.css';

const Nav = (props) =>{

const[showProfileDropDown,setShowProfileDropDropDown]= useState(false)
let currentUserInfo = {...props.currentUser}
if(!currentUserInfo?.photoURL){
	currentUserInfo.photoURL = dummyProfilePic
}
	return(
	<div>
			<ul className="nav nav-tabs">		
			<li className="nav-item">
				<button
					className="nav-link "
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
			<li className="nav-item dropdown">
				<button
					className="nav-link dropdown-toggle"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
				>
					Tv shows
				</button>
				<div className="dropdown-menu">
					<a
						className="dropdown-item"
						href="/TvShows"
						onClick={(e) => {
							e.preventDefault();
							props.urlLocation.history.push('/TvShows');
							props.TvShows();
						}}
					>
						Discover
					</a>
				</div>
			</li>
			<li className="nav-item">
				<button className="nav-link" onClick={() => props.trending()}>
					Trending
				</button>
			</li>
			{/* <li className="nav-item">
				<button
					className="nav-link"
					disabled={true}
					onClick={() => {
						props.urlLocation.history.push('/favorites');
						props.getFavmovies();
					}}
				>
					Favorites
				</button>
			</li> */}
			{props.currentUser ? (
				<div className="profileImgContainer">
					<img className="profileImg" src={currentUserInfo.photoURL} alt="profilePic" onClick={
						()=> setShowProfileDropDropDown(!showProfileDropDown)
					}/>
				{showProfileDropDown?				
				 <div className="dropdown-Profile">
				 <ul className="dropDownList">
				 <li
						
						onClick={() => {
							auth.signOut();
						}}
					>
						Logout
					</li>
				 <li
						
						
					>
						Profile
					</li>
				 </ul> 
				
				</div>: <div/>}
				 </div>
			
			) : (
				<div>
	
			
					<h5
						className="login-btn"
						onClick={() => {
							props.urlLocation.history.push('/login');
						}}
					>
						Login{' '}
					</h5>
					<h5
						className="signup-btn"
						onClick={() => {
							props.urlLocation.history.push('/signup');
						}}
					>
						Signup{' '}
					</h5>
				</div>
			)}
		</ul>
	
	
	<ul className="mobileNav">
	<li className="nav-item">
	
				<button
					className="nav-link "
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


			<li className="nav-item ">
				<button
					className="nav-link"								
					onClick={(e) => {
							e.preventDefault();
							if (props.urlLocation) {
								props.urlLocation.history.push('/TvShows');
						}
							
							props.TvShows();
						}}
				>
					Tv shows
				</button>
				
			</li>

			<li className="nav-item">
				<button className="nav-link" onClick={() => props.trending()}>
					Trending
				</button>
			</li>
	</ul>
	</div>
	);
} 


export default withRouter(Nav);
