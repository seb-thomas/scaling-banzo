var Programme = require('../models/programme');

exports.postProgrammes = function(req, res) {
    // create a new instance of the Programme model
    var programme = new Programme();

    // Set the programme properties that came from the POST data
    programme.name = req.body.name;
    programme.pid = req.body.pid;
    // programme.userId = req.user._id;

    // save the programme and check for errors
    programme.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Programme created!' });
    });
}

exports.getProgrammes = function(req, res) {
    Programme.find(function(err, programmes) {
        if (err)
            res.send(err);

        res.json(programmes);
    });
}

exports.getProgramme = function(req, res) {
    Programme.findById(req.params.programme_id, function(err, programme) {
        if (err)
            res.send(err);
        res.json(programme);
    });
}

exports.putProgramme = function(req, res) {
    // use our programme model to find the programme we want
    Programme.findById(req.params.programme_id, function(err, programme) {

        if (err)
            res.send(err);

        programme.name = req.body.name;  // update the programmes info
        programme.pid = req.body.pid;  // update the programmes info

        // save the programme
        programme.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Programme updated!' });
        });

    });
}

exports.deleteProgramme = function(req, res) {
    Programme.remove({
        _id: req.params.programme_id
    }, function(err, programme) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
}