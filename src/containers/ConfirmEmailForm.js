import React from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resendCode, verifyUser } from '../api/login';
import Button from '../components/Button';
import HeaderedBox from '../components/HeaderedBox';
import Icon from '../components/Icon';
import InputField from '../components/InputField';
import useForm from '../hooks/useForm';

const useStyles = createUseStyles({
	form: {
		width: '100%',
		maxWidth: '550px'
	},
	boxContainer: {
		margin: '2em'
	},
	iconSpinner: {
		animationDuration: '1s'
	}
});

export default function ConfirmEmailForm({ email }) {
	const classes = useStyles();
	const history = useHistory();
	const [submitting, setSubmitting] = React.useState(false);
	const [codeResent, setResent] = React.useState(false);
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
						toast.error(rej.message);
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

	const resend = React.useCallback(() => {
		resendCode(email);
		setResent(true);
	}, [email]);

	return (
		<HeaderedBox title="Verify your email" className={classes.boxContainer}>
			<h2>Verification</h2>
			<p>Please enter your 6 digit verification code below. This should have been e-mailed to you.</p>
			<form onSubmit={handleSubmit(onSubmit)} action="#" className={classes.form}>
				<InputField type="text" placeholder="Verification Code" {...fields.verificationCode} {...submittingState} />
				<p>
					Can't find your code?{' '}
					{codeResent ? (
						'Sent!'
					) : (
						<Button isLink onClick={resend}>
							Re-send
						</Button>
					)}
					.
				</p>
				<Button {...submittingState} type="submit" modifiers={['block', 'orange', 'strong', 'spaceTop', 'spaceBottom']}>
					Confirm {submitting && <Icon icon="sync-alt" spin className={classes.iconSpinner} />}
				</Button>
			</form>
		</HeaderedBox>
	);
}
