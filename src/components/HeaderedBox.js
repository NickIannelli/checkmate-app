import React, { forwardRef } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	container: {
		boxShadow: '0 3px 5px -2px rgba(0, 0, 0, 0.3), 0 2px 10px 0 rgba(0, 0, 0, 0.1)',
		background: 'white',
		borderRadius: '5px',
		overflow: 'hidden',
		margin: '0 10px'
	},
	header: {
		boxShadow: '0 3px 5px -2px rgba(0, 0, 0, 0.3)',
		background: 'linear-gradient(90deg, #F56B2F, #EF7297)',
		minHeight: '1em',
		padding: '5px 20px',
		textAlign: 'left',
		color: 'white',
		userSelect: 'none',
		fontSize: '1.6em'
	},
	children: { padding: '5px 20px', textAlign: 'left' }
});

export default forwardRef(function HeaderedBox({ as: Comp = 'div', title, children, className, ...props }, ref) {
	const classes = useStyles();

	return (
		<Comp {...props} className={[classes.container, className].filter(Boolean).join(' ')} ref={ref}>
			<div className={classes.header}>{title || ''}</div>
			{children && <div className={classes.children}>{children}</div>}
		</Comp>
	);
});
