import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './Pages/homePage'
import LoginPage from './Pages/loginPage'
import SignupPage from './Pages/signupPage'
import MainPage from './Pages/mainPage'
import SearchPage from './Pages/searchAuthor'
import BookPage from './Pages/bookPage'
import BooksYouAddedPage from './Pages/booksYouAddedPage'
import ReviewsYouAddedPage from './Pages/reviewsYouAddedPage'
import decode from 'jwt-decode'

const checkAuth = () => {
    const token = localStorage.getItem('token');
    console.log("checkAuth called with token: " + token)
    const refreshToken = localStorage.getItem('refreshToken');
    if (!token || !refreshToken) {
      return false;
    }
  
    try {
      // { exp: 12903819203 }
      const { exp } = decode(refreshToken);
  
      if (exp < new Date().getTime() / 1000) {
        return false;
      }
  
    } catch (e) {
      return false;
    }
  
    return true;
  }

  const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      checkAuth() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
    )} />
  )

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                {/* <Route exact path="/" component={HomePage}/> */}
                <Route exact path="/" component={HomePage} />
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/signup" component={SignupPage}/>
                <AuthRoute exact path="/main" component={MainPage}/>
                <Route exact path="/search" component={SearchPage}/>
                <Route exact path="/book" component={BookPage}/>
                {/* <AuthRoute exact path="/books-you-added" component={BooksYouAddedPage}/> */}
                <Route exact path="/reviews-you-added" component={ReviewsYouAddedPage}/>
            </Switch>
        </Router>
    );
}

export default AppRouter;