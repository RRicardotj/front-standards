import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './resources/styles/theme.scss';
import App from './App';
import { unregister } from './registerServiceWorker';

unregister();

ReactDOM.render(<App />, document.getElementById('root'));
