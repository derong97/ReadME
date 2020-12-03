# ReadME preview
    
## Main Page
* Simple UI interface with a catchphrase to attract users to signup for ReadME

![Main Page](/frontend/images/start_page.png)  

## Sign Up Page
* Form validation to prevent duplicated emails in the database
* Email is unique per user

![Sign Up Page](/frontend/images/signup_page.png)  

## Sign In Page
* Token based authentication

![Sign In Page](/frontend/images/signin_page.png)

## Home Page
* Displays a list of 10 books that are sorted by rating from the reviews with pagination
* Filter books by categories

![Home Page](/frontend/images/home_page.png)  

## Search Page
*  Displays a list of 10 books based on the search title that are sorted by rating from the reviews with pagination
  
![Search Page](/frontend/images/search_page.png)  

## By Me Page
* Allows users to view all the reviews they added
* Delete a review
* Edit a review
  * User can view the updated changes of the review in BY ME page after submitting
* Add a new review

![By Me Page](/frontend/images/byme_page.png)  

## Book Page
* Display the book details after selecting a book
  * Book title, categories, average rating from all the reviews, price, asin, brand, sales rank
  * All the reviews of the book
  * 3 related books
  
![Book Page](/frontend/images/book_page.png)  

## Add Book Modal
* Form validation to check for repeated asin
* Notification on successful upload
* User can search and view the book after uploading

![Add Book Modal](/frontend/images/add_book_modal.png)

## Add Review Modal
* Form validation - check if user has reviewed on the book before
* Notification on successful upload
* User can view the review in 'By Me' page after uploading
  
![Add Review Modal](/frontend/images/add_review_modal.png)  
