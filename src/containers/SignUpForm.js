import React from 'react';
import { createUseStyles } from 'react-jss';
import { signUp } from '../api/login';
import Button from '../components/Button';
import HeaderedBox from '../components/HeaderedBox';
import InputField from '../components/InputField';
import useForm from '../hooks/useForm';

const today = new Date();
const maxDate = `${today.getFullYear() - 18}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate()}`;
const minDate = `${today.getFullYear() - 118}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate()}`;

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
	const [submitting, setSubmitting] = React.useState(false);
	const { fields, handleSubmit } = useForm({
		fields: ['email', 'password', 'firstName', 'surname', 'birthDate'],
		initialValues: {
			birthDate: maxDate
		}
	});
	const onSubmit = React.useCallback(e => {
		setSubmitting(true);

		signUp(e.email, e.password, e.firstName, e.surname, e.birthDate)
			.then(success => {
				// @TODO
				console.log('success!', success);
			})
			.catch(e => {
				// @TODO - handle errors
				console.log('bad!: ', e);
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
		<HeaderedBox title="Let's get started" className={classes.boxContainer}>
			<h2>We just need a few details</h2>
			<form onSubmit={handleSubmit(onSubmit)} action="#" className={classes.form}>
				<InputField type="email" placeholder="Email" {...fields.email} {...submittingState} />
				<InputField type="password" placeholder="Password" {...fields.password} {...submittingState} />
				<InputField type="text" placeholder="First Name" {...fields.firstName} {...submittingState} />
				<InputField type="text" placeholder="Surname" {...fields.surname} {...submittingState} />
				<InputField
					type="date"
					min={minDate}
					max={maxDate}
					placeholder="Date of birth"
					{...fields.birthDate}
					{...submittingState}
				/>
				<Button type="submit" modifiers={['block', 'orange', 'strong', 'spaceTop', 'spaceBottom']}>
					Sign up!
				</Button>
			</form>
		</HeaderedBox>
	);
}
