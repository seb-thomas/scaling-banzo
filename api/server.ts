// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
import { json, urlencoded } from "body-parser";
import { DBHost } from "config";
import express, { Router } from "express";
import { connect, connection, Promise } from "mongoose";
import morgan from "morgan";

// Modules
import {
  deleteBrand,
  deleteBrands,
  getBrand,
  getBrands,
  postBrands,
  putBrand
} from "./controllers/brand";
import { deleteEpisodes, getEpisodes } from "./controllers/episode";
import {
  populateBrands,
  populateEpisodeIndex,
  populateEpisodes
} from "./controllers/populate";

// define our app using express
const app = express();
const port = process.env.PORT || 8888;

// Database
// db options
const options = {
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

// Connect to db
connect(
  DBHost,
  options
);
// Promise = require("bluebird");
const db = connection;
db.on("error", console.error.bind(console, "connection error:"));

// Morgan logging
// don't show the log when it is test
// if (config.util.getEnv("NODE_ENV") !== "test") {
//   // use morgan to log at command line
//   app.use(morgan("combined")); // 'combined' outputs the Apache style LOGs
// }

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(urlencoded({ extended: true }));
app.use(json());

// ROUTES FOR OUR API
// =============================================================================
const router = Router(); // get an instance of the express Router

// middleware to use for all requests
router.use((req, res, next) => {
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8888/api)
router.get("/", (req, res) => res.json({ message: "Pee-yoo! You stinky!" }));

// Populate the db with brands as per brandPids[] set in config
// BrandSchema
router.route("/populate/brands").get(populateBrands);

router.route("/populate/episodes/index/:brand_pid").get(populateEpisodeIndex);

router.route("/populate/episodes/").get(populateEpisodes);

// on routes that end in /brands
// ----------------------------------------------------
router
  .route("/brands")
  .post(postBrands)
  .get(getBrands)
  .delete(deleteBrands);

// on routes that end in /brands/:brand_id
// ----------------------------------------------------
router
  .route("/brands/:brand_id")
  .get(getBrand)
  .put(putBrand)
  .delete(deleteBrand);

// on routes that end in /episodes
// ----------------------------------------------------
router
  .route("/episodes")
  .get(getEpisodes)
  .delete(deleteEpisodes);

// Create endpoint handlers for /users
// router.route('/users')
//   .post(userController.postUsers)
//   .get(authController.isAuthenticated, userController.getUsers);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use("/api", router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Magic happens on port http://localhost:" + port);
