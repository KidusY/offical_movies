import React from 'react';
import { auth, signInWithGoogle, createUserProfileDocument } from '../../firebase.util';
export const SignupFrom = (props) => {
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { name, email, password } = e.target;
		const additionalInfo = {
			displayName: name.value
		};
		try {
			const { user } = await auth.createUserWithEmailAndPassword(email.value, password.value);

			createUserProfileDocument(user, additionalInfo);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<form style={{ width: '40%', display: 'block', margin: '100px auto' }} onSubmit={handleSubmit}>
			<div className="form-group">
				<label for="exampleInputEmail1 text-white" style={{ color: 'white' }}>
					Email address
				</label>
				<input
					type="email"
					name="email"
					className="form-control"
					id="exampleInputEmail1"
					aria-describedby="emailHelp"
				/>
			</div>
			<div className="form-group">
				<label for="exampleInputName text-white" style={{ color: 'white' }}>
					Full Name
				</label>
				<input
					type="text"
					name="name"
					className="form-control"
					id="exampleInputName"
					aria-describedby="textHelp"
				/>
			</div>
			<div className="form-group">
				<label for="exampleInputPassword1 text-white" style={{ color: 'white' }}>
					Password
				</label>
				<input type="password" name="password" className="form-control" id="exampleInputPassword1" />
			</div>

			<button type="submit" className="btn btn-primary " style={{ width: '100%' }}>
				Signup
			</button>

			<button
				type="submit"
				className="btn btn-light"
				onClick={signInWithGoogle}
				style={{ width: '100%', marginTop: '10px' }}
			>
				Google
			</button>
		</form>
	);
};

export default SignupFrom;
