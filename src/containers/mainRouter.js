import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import YoloTry from '../b2bleadsTry/yoloTry'
import PaymentOrEmailPage from '../b2bleadsTry/PaymentOrEmailPage'

class MainRoute extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    
                <Route path="/" exact component={YoloTry}></Route>
                <Route path="/second"  component={PaymentOrEmailPage}></Route>
                </Switch>
            </Router>
        );
    }
}



export default MainRoute;