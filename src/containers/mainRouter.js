import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import YoloTry from '../b2bleadsTry/yoloTry'
import PaymentOrEmailPage from '../b2bleadsTry/PaymentOrEmailPage'
import HomeComponent from '../b2bleadsTry/HomeComponent/homeComponent'
class MainRoute extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    
                <Route path="/" exact component={YoloTry}></Route>
                <Route path="/second"  component={PaymentOrEmailPage}></Route>
                <Route path="/home" component={HomeComponent}></Route>    
                {/*<Route path="/askedQuestions" component={AskedQuestions}></Route>*/}
                </Switch>
            </Router>
        );
    }
}



export default MainRoute;