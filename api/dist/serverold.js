"use strict";
// server.js
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// BASE SETUP
// =============================================================================
// call the packages we need
const body_parser_1 = require("body-parser");
const config_1 = require("config");
const express_1 = __importStar(require("express"));
const mongoose_1 = require("mongoose");
// Modules
const brand_js_1 = require("./controllers/brand.js");
const episode_1 = require("./controllers/episode");
const populate_1 = require("./controllers/populate");
// define our app using express
const app = express_1.default();
const port = process.env.PORT || 8888;
// Database
// db options
const options = {
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};
// Connect to db
mongoose_1.connect(config_1.DBHost, options);
// Promise = require("bluebird");
const db = mongoose_1.connection;
db.on("error", console.error.bind(console, "connection error:"));
// Morgan logging
// don't show the log when it is test
// if (config.util.getEnv("NODE_ENV") !== "test") {
//   // use morgan to log at command line
//   app.use(morgan("combined")); // 'combined' outputs the Apache style LOGs
// }
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(body_parser_1.urlencoded({ extended: true }));
app.use(body_parser_1.json());
// ROUTES FOR OUR API
// =============================================================================
const router = express_1.Router(); // get an instance of the express Router
// middleware to use for all requests
router.use((req, res, next) => {
    next(); // make sure we go to the next routes and don't stop here
});
// test route to make sure everything is working (accessed at GET http://localhost:8888/api)
router.get("/", (req, res) => res.json({ message: "Pee-yoo! You stinky!" }));
// Populate the db with brands as per brandPids[] set in config
// BrandSchema
router.route("/populate/brands").get(populate_1.populateBrands);
router.route("/populate/episodes/index/:brand_pid").get(populate_1.populateEpisodeIndex);
router.route("/populate/episodes/").get(populate_1.populateEpisodes);
// on routes that end in /brands
// ----------------------------------------------------
router
    .route("/brands")
    .post(brand_js_1.postBrands)
    .get(brand_js_1.getBrands)
    .delete(brand_js_1.deleteBrands);
// on routes that end in /brands/:brand_id
// ----------------------------------------------------
router
    .route("/brands/:brand_id")
    .get(brand_js_1.getBrand)
    .put(brand_js_1.putBrand)
    .delete(brand_js_1.deleteBrand);
// on routes that end in /episodes
// ----------------------------------------------------
router
    .route("/episodes")
    .get(episode_1.getEpisodes)
    .delete(episode_1.deleteEpisodes);
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
//# sourceMappingURL=serverold.js.map