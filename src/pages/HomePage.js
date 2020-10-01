import React from 'react';
import { Redirect } from 'react-router-dom';
import withAuth from '../wrappers/withAuth';

export default withAuth(function HomePage({ isAuthenticated }) {
	return (
		<>
			{isAuthenticated && <Redirect to="/app/" />}
			{isAuthenticated === false && <Redirect to="/signup" />}
			{isAuthenticated === undefined && 'Loading...'}
		</>
	);
});
