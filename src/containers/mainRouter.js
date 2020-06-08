import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, HashRouter} from 'react-router-dom'
import YoloTry from '../b2bleadsTry/yoloTry'
import PaymentOrEmailPage from '../b2bleadsTry/PaymentOrEmailPage'
import HomeComponent from '../b2bleadsTry/HomeComponent/homeComponent'
import Aboutuscomponent from '../b2bleadsTry/AboutUsComponent/aboutuscomponent'
import AskedQuestionsComponent from '../b2bleadsTry/AskedQuestionsComponent/askedQuestionsComponent'
import ContactUsComponent from '../b2bleadsTry/ContactUsComponent/contactUsComponent'
class MainRoute extends Component {

    render() {
        return (
            <HashRouter >
                <Switch>
                    
                <Route path="/" exact component={HomeComponent}></Route>
                <Route path="/home" exact component={HomeComponent}></Route>
                <Route path="/second"  component={PaymentOrEmailPage}></Route>
                <Route path="/leads" component={YoloTry}></Route>
                <Route path="/aboutus" component={Aboutuscomponent}></Route>
                <Route path="/questions" component={AskedQuestionsComponent}></Route>   
                <Route path="/contactus" component={ContactUsComponent}></Route> 
                {/*<Route path="/askedQuestions" component={AskedQuestions}></Route>*/}
                </Switch>
            </HashRouter>
        );
    }
}



export default MainRoute;