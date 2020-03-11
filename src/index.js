import React from 'react';
import ReactDOM from 'react-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.



import './index.css';
import '../src/consts/fonts/Gilmer-Light.otf'
import '../src/consts/fonts/Gilmer Heavy.ttf'
import '../src/consts/fonts/Gilmer Regular.ttf'
import App from './App';
import AppCopy from './Appcopy';
import YoloTry from './b2bleadsTry/yoloTry'
import MainRoute from './containers/mainRouter'
import * as serviceWorker from './serviceWorker';
import Spinner from './components/dumb/Spinner/spinner'
import CardForm from '../src/b2bleadsTry/StripeElements/stripeElements'
//redux provider
import { Provider } from 'react-redux'
//store
import {store} from './store/store'

ReactDOM.render(<Provider store={store}><MainRoute></MainRoute>,</Provider>, document.getElementById('root'));


  
//ReactDOM.render(<App1/>, document.getElementById('root'));*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
