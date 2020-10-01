import React from 'react';
import { Redirect } from 'react-router-dom';
import withAuth from '../wrappers/withAuth';
import SignUpForm from '../containers/SignUpForm';

export default withAuth(function SignUpPage({ isAuthenticated }) {
	return (
		<>
			{isAuthenticated && <Redirect to="/app/" />}
			<SignUpForm />
		</>
	);
});
