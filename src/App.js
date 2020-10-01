import React, { Suspense } from 'react';
import { createUseStyles } from 'react-jss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import NotFoundPage from './pages/NotFoundPage';
import ConfirmEmailPage from './pages/ConfirmEmailPage';
import AppPage from './pages/AppPage';

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
			<ToastContainer hideProgressBar position="bottom-center" />
			<BrowserRouter>
				<Suspense fallback="Loading...">
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route exact path="/login" component={SignInPage} />
						<Route exact path="/signup" component={SignUpPage} />
						<Route exact path="/app/" component={AppPage} />
						<Route exact path="/confirm/:email" component={ConfirmEmailPage} />
						<Route path="*" component={NotFoundPage} />
					</Switch>
				</Suspense>
			</BrowserRouter>
		</div>
	);
}

export default App;
