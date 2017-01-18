// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

var Programme  = require('./models/programme');
var app        = express();                 // define our app using express


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8888;        // set our port


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

// on routes that end in /programmes
// ----------------------------------------------------
router.route('/programmes')

    // create a programme (accessed at POST http://localhost:8080/api/programmes)
    .post(function(req, res) {
        
        var programme = new Programme();  // create a new instance of the Programme model
        programme.name = req.body.name;  // set the programmes name (comes from the request)

        // save the programme and check for errors
        programme.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Programme created!' });
        });
        
    })

    .get(function(req, res) {
        Programme.find(function(err, programmes) {
            if (err)
                res.send(err);

            res.json(programmes);
        });
    });

// on routes that end in /programmes/:programme_id
// ----------------------------------------------------
router.route('/programmes/:programme_id')

    // get the programme with that id (accessed at GET http://localhost:8080/api/programmes/:programme_id)
    .get(function(req, res) {
        Programme.findById(req.params.programme_id, function(err, programme) {
            if (err)
                res.send(err);
            res.json(programme);
        });
    })

    // update the programme with this id (accessed at PUT http://localhost:8080/api/programmes/:programme_id)
    .put(function(req, res) {

        // use our programme model to find the programme we want
        Programme.findById(req.params.programme_id, function(err, programme) {

            if (err)
                res.send(err);

            programme.name = req.body.name;  // update the programmes info

            // save the programme
            programme.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Programme updated!' });
            });

        });
    })

    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:programme_id)
    .delete(function(req, res) {
        Programme.remove({
            _id: req.params.programme_id
        }, function(err, programme) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

mongoose.connect('mongodb://localhost:27017/bearsdb');
