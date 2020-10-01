import React, { forwardRef } from 'react';
import { createUseStyles } from 'react-jss';

const activeNotDisabled = '&:hover:enabled, &:active:enabled, &:focus:enabled';

const useStyles = createUseStyles({
	base: {
		transition: 'all 0.2s ease',
		padding: '1em',
		borderRadius: '5px',
		border: 'none',
		boxShadow: '0 2px 5px -1px rgba(0, 0, 0, 0.5), 0 2px 10px 0 rgba(0, 0, 0, 0.1)',

		[`${activeNotDisabled}, &:disabled`]: {
			boxShadow: '0 4px 7px -3px rgba(0, 0, 0, 0.8), 0 0 5px 0 rgba(0, 0, 0, 0.4)',
			outline: 'none'
		}
	},
	link: {
		display: 'inline',
		background: 'none',
		border: 'none',
		margin: 0,
		padding: 0,
		fontSize: '1em',
		textAlign: 'left',
		color: 'blue',
		userSelect: 'text',
		textDecoration: 'underline',

		'&:hover': {
			color: 'darkblue'
		},

		'&:active': {
			color: 'red'
		},

		[activeNotDisabled]: {
			outline: 'none'
		}
	},
	block: {
		width: '100%'
	},
	slim: {
		padding: 0
	},
	strong: {
		fontWeight: 'bold'
	},
	orange: {
		background: '#F56B2F',
		color: 'white',

		[activeNotDisabled]: {
			background: '#d2683a'
		},

		'&:disabled': {
			background: '#984926'
		}
	},
	spaceTop: {
		marginTop: '1em'
	},
	spaceBottom: {
		marginBottom: '1em'
	}
});

export default forwardRef(function Button({ type = 'button', isLink, modifiers = [], className, ...props }, ref) {
	const classes = useStyles();

	if (isLink) {
		return <button type="button" className={classes.link} {...props} />;
	}

	const classNames = ['base', className, ...modifiers]
		.map(modifier => classes[modifier])
		.filter(Boolean)
		.join(' ');

	return <button type={type} className={classNames} {...props} />;
});
