import React from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router-dom';
import { verifyUser } from '../api/login';
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

export default function ConfirmEmailForm({ email }) {
	const classes = useStyles();
	const history = useHistory();
	const [submitting, setSubmitting] = React.useState(false);
	const { fields, handleSubmit } = useForm({
		fields: ['verificationCode']
	});
	const onSubmit = React.useCallback(
		e => {
			setSubmitting(true);

			verifyUser(email, e.verificationCode)
				.then(
					() => {
						history.replace('/app/');
					},
					rej => {
						console.error(rej);
					}
				)
				.finally(() => {
					setSubmitting(false);
				});
		},
		[email, history]
	);
	const submittingState = submitting
		? {
				disabled: true
		  }
		: {};

	return (
		<HeaderedBox title="Verify your email" className={classes.boxContainer}>
			<h2>Verification</h2>
			<p>Please enter your 6 digit verification code below. This should have been e-mailed to you.</p>
			<form onSubmit={handleSubmit(onSubmit)} action="#" className={classes.form}>
				<InputField type="text" placeholder="Verification Code" {...fields.verificationCode} {...submittingState} />
				<Button {...submittingState} type="submit" modifiers={['block', 'orange', 'strong', 'spaceTop', 'spaceBottom']}>
					Confirm
				</Button>
			</form>
		</HeaderedBox>
	);
}
