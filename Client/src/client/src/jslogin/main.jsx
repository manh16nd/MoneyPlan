import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {Router, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import {configureStore} from './store';
import '../css/app.scss';
import createRoutes from './routes';
const store = configureStore();
const routes = createRoutes();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
   	<Provider store={store}>
    	<Router history={history} routes={routes} />
  	</Provider>,
  document.getElementById('widgets-container')
);