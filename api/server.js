// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
const express    = require('express'),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      morgan     = require('morgan');
      config     = require('config');

// Modules
const brandController  = require('./controllers/brand');
const episodeController  = require('./controllers/episode');
const populateController  = require('./controllers/populate');

// define our app using express
const app = module.exports = express();
const port = process.env.PORT || 8888;

// Database
// db options
const options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};

// Connect to db
mongoose.connect(config.DBHost, options);
mongoose.Promise = require('bluebird');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Morgan logging
// don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTES FOR OUR API
// =============================================================================
let router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8888/api)
router.get('/', (req, res) => res.json({ message: 'Pee-yoo! You stinky!' }));

// Populate the db with brands as per brandPids[] set in config
// BrandSchema
router.route('/populate/brands')
    .get(populateController.populateBrands);

router.route('/populate/episodes/index/:brand_pid')
    .get(populateController.populateEpisodeIndex);

router.route('/populate/episodes/')
    .get(populateController.populateEpisodes);

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

// on routes that end in /episodes
// ----------------------------------------------------
router.route('/episodes')
    .get(episodeController.getEpisodes)
    .delete(episodeController.deleteEpisodes);

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