[![Code Climate](https://codeclimate.com/github/mserino/Shopping-Cart/badges/gpa.svg)](https://codeclimate.com/github/mserino/Shopping-Cart)

Shopping Cart
=============

Frontend webapp displaying a list of products with name, category and price.
Can add the item to the cart, can remove the item from the cart.

###Technologies
- AngularJS
- HTML & CSS
- Bootstrap
- Jasmine for Unit testing
- Protractor for EndToEnd testing
- Yeoman to structure the app
- NodeJs

###Structure
app/scripts -> contains the javascript files that structure the application
app/scripts/controllers -> angular controllers
app/scripts/app.js -> main angular module and routing

app/views -> singolar views
app/index.html -> main html page

test/e2e -> End to End tests
test/spec/controllers -> Unit tests

###How do you use it?
`git clone https://github.com/mserino/Shopping-Cart`

`cd Shopping-Cart`

`npm install`

`bower install`

###Run tests
`npm run protractor`

``