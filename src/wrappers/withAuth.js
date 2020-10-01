import React from 'react';
import { getIsAuthenticated } from '../api/login';

const withAuth = Component => props => {
	const [isAuthenticated, setAuthenticated] = React.useState();
	React.useLayoutEffect(() => {
		getIsAuthenticated().then(
			() => {
				setAuthenticated(true);
			},
			() => {
				setAuthenticated(false);
			}
		);
	});

	return <Component isAuthenticated={isAuthenticated} {...props} />;
};

export default withAuth;
