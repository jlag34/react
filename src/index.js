import React from 'react';
import ReactDOM from 'react-dom';
import { StripeProvider } from 'react-stripe-elements';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import promiseMiddleware from 'redux-promise';

import App from './components/App';
// import reducers from './reducers';

import { injectGlobal } from 'styled-components';
import avenir from '../font/AvenirLTStd-Light.otf';
injectGlobal`
	@font-face {
		font-family: 'Avenir';
		src: url(${avenir}) format('opentype');
		font-weight: normal;
		font-style: normal;
	}

	* {
		font-family: 'Avenir', sans-serif;
	}
`;


// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

ReactDOM.render(
	<StripeProvider apiKey="pk_test_JHWMGFHUtZrtt22a4ho8JhiM">
		<App />
	</StripeProvider>
	, document.querySelector('#root')
);