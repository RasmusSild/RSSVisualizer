import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import Feed from './Feed';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Feed />, document.getElementById('root'));
registerServiceWorker();
