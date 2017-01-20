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
            // var programme = new Programme();

            // programme.name = body.programme.title;
            // programme.pid = body.programme.pid;

            // programme.save(function(err) {
            //     if (err)
            //         console.log(err);
            // });
            var query = {pid: body.programme.pid},
                update = {
                    name: body.programme.title,
                    pid: body.programme.pid
                },
                options = { upsert: true, new: true };

            // Find the document
            Programme.findOneAndUpdate(query, update, options, function(err, result) {
                if (err) return res.send(500, { error: err });
                return res.send("succesfully saved");
            });
        })
        .catch(function (err) {
            res.send(err);
        })
        .finally(function () {
            // This is called after the request finishes either successful or not successful.
            return res.json({ message: 'Programme updated! (maybe)' });
        });
}

// exports.hipsterJesus = {

//     html: function(req, res) {
//         return rp('http://hipsterjesus.com/api/').then(function(data) {
//             res.json({message: data.text});
//         });
//     },

//     paragraphs: function() {
//         return this.html().then(function(html) {
//             return html.replace(/<[^>]+>/g, "").split("");
//         });
//     }
// };