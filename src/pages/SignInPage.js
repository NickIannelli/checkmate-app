import React from 'react';
import { Redirect } from 'react-router-dom';
import withAuth from '../wrappers/withAuth';
import SignInForm from '../containers/SignInForm';

export default withAuth(function SignInPage({ isAuthenticated }) {
	return (
		<>
			{isAuthenticated && <Redirect to="/app/" />}
			<SignInForm />
		</>
	);
});
