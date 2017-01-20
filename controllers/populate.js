var rp = require('request-promise');
var Programme = require('../models/programme');

exports.populateProgrammes = function(req, res) {
    let programmes = ['b007qlvb'];

    var options = {
        uri: 'http://www.bbc.co.uk/programmes/b007qlvb.json',
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };

    rp(options)
        .then(function (body) {
            console.log(body);
            var programme = new Programme();

            programme.name = body.programme.title;
            programme.pid = body.programme.pid;

            programme.save(function(err) {
                if (err)
                    console.log(err);
            });
        })
        .catch(function (err) {
            res.send(err);
        })
        .finally(function () {
            // This is called after the request finishes either successful or not successful.
            res.json({ message: 'Programme updated! (maybe)' });
        });
}