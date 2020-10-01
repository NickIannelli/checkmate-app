import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import withAuth from '../wrappers/withAuth';
import ConfirmEmailForm from '../containers/ConfirmEmailForm';

export default withAuth(function ConfirmEmailPage({ isAuthenticated }) {
	const { email } = useParams();

	return (
		<>
			{isAuthenticated && <Redirect to="/app/" />}
			{/* {!email && <Redirect to="/" />} */}
			<ConfirmEmailForm email={email} />
		</>
	);
});
