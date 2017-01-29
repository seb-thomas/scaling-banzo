// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    morgan     = require('morgan');


// Modules
var brandController  = require('./controllers/brand');
var populateController  = require('./controllers/populate');

// define our app using express
var app = module.exports = express();
var port = process.env.PORT || 8888;

// Connect to db
mongoose.connect('mongodb://localhost:27017/bearsdb');
mongoose.Promise = require('bluebird');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8888/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});
router.route('/populate/brands')
    .get(populateController.populateBrands);

// on routes that end in /brands
// ----------------------------------------------------
router.route('/brands')
    .post(brandController.postBrands)
    .get(brandController.getBrands)
    .delete(brandController.deleteBrands);

// on routes that end in /brands/:brand_id
// ----------------------------------------------------
router.route('/brands/:brand_id')
    .get(brandController.getBrand)
    .put(brandController.putBrand)
    .delete(brandController.deleteBrand);

// Create endpoint handlers for /users
// router.route('/users')
//   .post(userController.postUsers)
//   .get(authController.isAuthenticated, userController.getUsers);


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port http://localhost:' + port);