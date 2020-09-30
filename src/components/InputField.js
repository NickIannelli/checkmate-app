import React, { forwardRef } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	input: {
		transition: 'all 0.2s ease-out',
		boxShadow: '0 2px 5px -1px rgba(0, 0, 0, 0.5), 0 2px 10px 0 rgba(0, 0, 0, 0.1)',
		background: 'white',
		borderRadius: '5px',
		border: '1px solid #fafafa',
		padding: '0.5em',
		width: '100%',
		margin: '10px 0',
		fontSize: '16px',

		'&:hover': {
			boxShadow: '0 4px 7px -3px rgba(0, 0, 0, 0.8), 0 0 5px 0 rgba(0, 0, 0, 0.4)'
		},

		'&:focus': {
			boxShadow: '0 4px 7px -3px rgba(0, 0, 0, 0.8), 0 0 5px 0 rgba(0, 0, 0, 0.4)',
			outline: 'none',
			borderColor: '#aeaeae'
		},

		'&:disabled': {
			background: '#cacaca',
			borderColor: '#cacaca'
		},

		'&:-webkit-autofill, &:-internal-autofill-selected': {
			backgroundColor: 'white !important',
			animationDelay: '1s',
			animationName: '$autofill',
			animationFillMode: 'both'
		}
	},

	'@keyframes autofill': {
		'0%, 100%': {
			backgroundColor: 'white !important'
		}
	}
});

export default forwardRef(function InputField({ as: Comp = 'input', title, className, ...props }, ref) {
	const classes = useStyles();

	return <Comp {...props} className={[classes.input, className].filter(Boolean).join(' ')} ref={ref} />;
});
