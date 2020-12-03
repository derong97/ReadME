# Endpoints
Refer to this [API documentation](https://bit.ly/37BVC4N)

# 50.043 Project: ReadME
Read Me Like a Book

## Table of Contents
* Production System
  * [Frontend](#frontend)
    * [Framework](#framework)
    * [Features](#features)
    * [Preview](#preview)
  * [Backend](#backend)
    * [Framework](#framework-1)
    * [API Design Patterns](#api-design-patterns)
    
## Frontend
### Framework
To create our web application, we used ReactJS as it allows us to build large-scale applications with data that changes repeatedly over time. Apart from that, it offers the easier creation of interactive UIs, JSX support, component-based structure and much more.

### Features
ReadME has the following features/ functionalities:
* Sign up and login to our ReadME website **[Extra feature]**
  + Token-based authentication
  + Email is unique per user
  + Form validation - check for repeated email upon sign up and check for invalid email and password upon login
* Navbar
  + Search for existing book by title
  + Add a new book
    + Form validation - check for repeated asin
    + Notification on successful upload
    + User can search and view the book upon upload
  + Add a new review
    + Form validation - check if user has reviewed on the book before
    + User can view the review in BY ME page upon upload
  + Logout of our ReadME website
* HOME page displays a list of 10 books that are sorted by rating from the reviews with pagination
  + Filter books by categories
  + Gets the metadata of the corresponding batch of 10 books, depending on the indicated categories as well as page number
* Display the following book details upon selection of a book **[Extra feature]**
  + Book title, categories, average rating from all the reviews, price, asin, brand, sales rank
  + All the reviews of the book
  + 3 related books
* BY ME page allows users to view all the reviews they added
  + Delete a review **[Extra feature]**
  + Edit a review **[Extra feature]**
    + User can view the updated changes of the review in BY ME page upon submit
  + Add a new review
    + Form validation - check if user has reviewed on the book before
    + User can view the review in BY ME page upon upload
 
## Backend 
### Framework
To serve our web application, we used Flask as the built-in Flask web server is provided for development convenience. It is a lightweight framework that can be practiced to implement web applications(e.g. ReactJS) and backend API applications(e.g. MySQL, MongoDB). However, Flask's built-in server is not suitable for production as it doesn't scale well. Hence to run Flask in production, we deployed our your Flask application to a standalone WSGI server(Gunicorn).

### API Design Patterns
#### MongoDB
1. Book metadata
   
   **Endpoints**
   

2. Web Logs (activities from users)
   
   **Endpoints**
   
   | Endpoint                    | Method | Description                                                  |
   |-----------------------------|--------|--------------------------------------------------------------|
   | /user/signup                | GET    | Signs up an account on the website.<br/>JSON Body<ul><li>name</li><li>email</li><li>password</li></ul>Returns a 200 response together with a JWT token and username if the user is successfully registered. Otherwise, returns a 400 response (e.g. the email has been used previously for sign up).|
   | /user/signout               | GET    | Redirects the user back to the HOME page. |
   | /user/login                 | POST   | Authenticates the user with the database.<br/>JSON Body<ul><li>email</li><li>password</li></ul>Returns a 200 response together with a JWT token and username if the user is successfully authenticated. Otherwise, returns a 400 response (e.g. invalid credentials).|

#### MySQL
1. Reviews
   
   **Endpoints**
   
   | Endpoint                    | Method   | Description                                                  |
   |-----------------------------|-------  -|--------------------------------------------------------------|
   | /reviews/user               | GET      | Gets all the reviews by the reviewerID.<br/>Returns a 200 response if review is successfully retrieved from the database. Otherwise, returns a 400 response.|
   | /book/<asin>                | POST     | Inserts the book review record.<br/>JSON Body<ul><li>overall: integer</li><li>reviewText: string</li><li>summary: string</li></ul>Returns a 200 response if review is successfully inserted into the database. Otherwise, returns a 400 response.|
   | /book/<asin>                | PUT      | Edits the book review record.<br/>JSON Body<ul><li>overall: integer</li><li>reviewText: string</li><li>summary: string</li></ul>Returns a 200 response if the record is successfully edited on the database. Otherwise, returns a 400 response.|
   | /book/<asin>                | DELETE   | Deletes the book review record. Returns a 200 response if review is successfully deleted from the database. Otherwise, returns a 400 response.|

   



 
