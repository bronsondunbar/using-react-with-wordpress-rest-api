import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'

import { Provider } from 'react-redux'
import createHistory from 'history/createHashHistory'

import reducers from './app/reducers'

import App from './app/app.js'

import configureStore from './store'
const history = createHistory()
const store = configureStore(history)

ReactDOM.render(
	<Provider store={store}>
		<Router>
	  	<App />
		</Router>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker()