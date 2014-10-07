Shopping Cart
=============

Frontend webapp displaying a list of products with name, category and price.

- Can add and remove the items to the cart. 
- The total price is shown on the page and is update every time a new item is added.
- The user can redeem a voucher only if is allowed to.
- The quantity in stock decreases every time an item is added, and if is out of stock the user cannot add anymore.

Built completely in front-end, with AngularJs.

Doesn't have server or database.

One-page only.

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

`grunt serve`

go to: `http://localhost:9000`

###Run tests
Integration tests:

`npm run protractor`

Unit tests:

`npm start`

`npm test`