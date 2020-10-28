import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './Pages/homePage'
import LoginPage from './Pages/loginPage'
import SignupPage from './Pages/signupPage'
import MainPage from './Pages/mainPage'
import BookPage from './Pages/bookPage'
import BooksYouAddedPage from "./Pages/booksYouAddedPage"
import ReviewsYouAddedPage from "./Pages/reviewsYouAddedPage"


const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={BooksYouAddedPage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/signup" component={SignupPage}/>
                <Route exact path="/main" component={MainPage}/>
                <Route exact path="/book" component={BookPage}/>
                <Route exact path="/books-you-added" component={BooksYouAddedPage}/>
                <Route exact path="/reviews-you-added" component={ReviewsYouAddedPage}/>
            </Switch>
        </Router>
    );
}

export default AppRouter;