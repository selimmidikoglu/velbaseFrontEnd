import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import AppCopy from './Appcopy';
import YoloTry from './b2bleadsTry/yoloTry'
import MainRoute from './containers/mainRouter'
import * as serviceWorker from './serviceWorker';
import Spinner from './components/dumb/Spinner/spinner'
//redux provider
import { Provider } from 'react-redux'
//store
import {store} from './store/store'
ReactDOM.render(<Provider store={store}><MainRoute/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
