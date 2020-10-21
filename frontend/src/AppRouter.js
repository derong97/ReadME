import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './LoginPage/HomePage'
// import LoginPage from './LoginPage/LoginPage'
// import SignupPage from './LoginPage/SignupPage'

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                {/* <Route exact path="/LoginPage" component={LoginPage}/>
                <Route exact path="/SignupPage" component={SignupPage}/> */}
            </Switch>
        </Router>
    );
}

export default AppRouter;