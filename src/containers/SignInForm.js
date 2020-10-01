import React from 'react';
import { createUseStyles } from 'react-jss';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signIn } from '../api/login';
import Button from '../components/Button';
import HeaderedBox from '../components/HeaderedBox';
import InputField from '../components/InputField';
import useForm from '../hooks/useForm';

const useStyles = createUseStyles({
	form: {
		width: '100%',
		maxWidth: '550px'
	},
	boxContainer: {
		margin: '2em'
	}
});

export default function LoginForm() {
	const classes = useStyles();
	const history = useHistory();
	const [submitting, setSubmitting] = React.useState(false);
	const { fields, handleSubmit } = useForm({
		fields: ['email', 'password']
	});
	const onSubmit = React.useCallback(e => {
		setSubmitting(true);

		signIn(e.email, e.password)
			.then(({ success, reason }) => {
				if (success) {
					history.replace('/app/');
				} else if (reason.code === 'UserNotConfirmedException') {
					history.replace(`/confirm/${e.email}`);
				} else {
					console.log('reason.code', reason.code);
					toast.error(reason.message);
				}
			})
			.finally(() => {
				setSubmitting(false);
			});
	}, []);
	const submittingState = submitting
		? {
				disabled: true
		  }
		: {};

	return (
		<HeaderedBox title="Sign in" className={classes.boxContainer}>
			<h2>Enter your details</h2>
			<p>
				Don&aps;t have an account? <Link to="/signup">Sign up instead</Link>
			</p>
			<form onSubmit={handleSubmit(onSubmit)} action="#" className={classes.form}>
				<InputField type="email" placeholder="Email" {...fields.email} {...submittingState} />
				<InputField type="password" placeholder="Password" {...fields.password} {...submittingState} />
				<Button {...submittingState} type="submit" modifiers={['block', 'orange', 'strong', 'spaceTop', 'spaceBottom']}>
					Sign in
				</Button>
			</form>
		</HeaderedBox>
	);
}
