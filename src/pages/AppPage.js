import React from 'react';
import { useHistory } from 'react-router-dom';
import { signOut } from '../api/login';
import Button from '../components/Button';

export default function AppPage() {
	const history = useHistory();
	return (
		<>
			<h5>This is where the rest of the application would go...</h5>
			<Button
				onClick={() => {
					signOut();
					history.replace('/');
				}}
			>
				Sign out
			</Button>
		</>
	);
}
