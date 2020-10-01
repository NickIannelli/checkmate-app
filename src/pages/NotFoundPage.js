import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
	return (
		<>
			<h2>The page you are looking for could not be found.</h2>
			<p>
				Please check the URL, or head to the <Link to="/">Homepage</Link> and start again
			</p>
		</>
	);
}
