import React from 'react';
import { createUseStyles } from 'react-jss';
import SignUpForm from './containers/SignUpForm';

const useStyles = createUseStyles({
	container: {
		backgroundColor: '#d6d6d6',
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		boxShadow: 'inset 0px -8px 10px -5px rgba(0, 0, 0, 0.4)'
	}
});

function App() {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<SignUpForm />
		</div>
	);
}

export default App;
