import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import App from './App';

library.add(faSyncAlt);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
