import React from 'react';
import {signInWithGoogle,auth } from '../../firebase.util'
export const LoginForm = (props) => {

const handleSubmit = async (e)=>{
	e.preventDefault();
	const {email,password}= e.target;
 
	try{
		await auth.signInWithEmailAndPassword(email.value,password.value)
	}
	catch(err){
		console.log(err)
	}
	
}

	return (
		<form style={{ width: '40%', display: 'block', margin: '100px auto' }} onSubmit={handleSubmit}>
			<div className="form-group">
				<label for="exampleInputEmail1 text-white" style={{ color: 'white' }}>
					Email address
				</label>
				<input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
				<small id="emailHelp" className="form-text text-muted">
					We'll never share your email with anyone else.
				</small>
			</div>
			<div className="form-group">
				<label for="exampleInputPassword1 text-white" style={{ color: 'white' }}>
					Password
				</label>
				<input type="password" name="password"  className="form-control" id="exampleInputPassword1" />
			</div>

			<button type="submit" className="btn btn-primary " style={{ width: '100%' }}>
				Login
			</button>

			<button type="submit" className="btn btn-light" onClick={signInWithGoogle} style={{ width: '100%', marginTop: '10px' }} >
				Google
			</button>
		</form>
	);
};

export default LoginForm;
