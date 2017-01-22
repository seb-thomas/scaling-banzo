var Promise = require("bluebird");
var rp = require('request-promise');
var Programme = require('../models/programme');

exports.populateProgrammes = function(req, res) {
    const pids = ['b007qlvb', 'b006qsq5', 'b006qrpf', 'b006tp43', 'b006qp6p', 'b006qgj4', 'b006r9xr', 'b006tnsf'];

    var options = {
        uri: 'http://www.bbc.co.uk/programmes/b006qsq5.json',
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };

    // rp(options)
    //     .then(function (body) {
    //         // Mongoose allows us query db for existing PID and upsert
    //         var query = {pid: body.programme.pid},
    //             update = {
    //                 name: body.programme.title,
    //                 pid: body.programme.pid,
    //                 desc: body.programme.short_synopsis
    //             },
    //             options = { upsert: true, new: true };

    //         // Find the document
    //         Programme.findOneAndUpdate(query, update, options, function(err, result) {
    //             if (err) return res.send(500, { error: err });
    //             return res.send("succesfully saved");
    //         });
    //     })
    //     .catch(function (err) {
    //         return res.send(err);
    //     })
    //     .finally(function () {
    //         // This is called after the request finishes either successful or not successful.
    //         // return res.json({ message: 'Programme updated! (maybe)' });
    //     });

        Promise.map(pids, pid => {
            let url = 'http://www.bbc.co.uk/programmes/'+pid+'.json';

            return rp({uri: url, json: true})
                .then(result => ({result, success:true}))
                .catch(error => ({error, success:false}))
        })
        .then(results => {
            let succeeded = results
                .filter(result => result.success)
                .map(result => result.result);
            let failed = results
                .filter(result => !result.success)
                .map(result => console.log('error', result.error));
        })
        .then(console.log.bind(console))
        .catch(console.log.bind(console))
        .finally(function () {
            // This is called after the request finishes either successful or not successful.
            return res.json({ message: 'Programme updated! (maybe)' });
        });

        // const findAndUpdate = (results) => Promise
        //     .each(results.map(obj => {
        //     // you have access to original {a: 'site.com'}
        //     // here, so use that 'a' prop to your advantage by abstracting out
        //     // your db config somewhere outside your service
        //     return Programme.findOneAndUpdate(someConfig[obj.source], obj.data);
        //     }))
        // // Mongoose allows us query db for existing PID and upsert
        // var query = {pid: body.programme.pid},
        //     update = {
        //         name: body.programme.title,
        //         pid: body.programme.pid,
        //         desc: body.programme.short_synopsis
        //     },
        //     options = { upsert: true, new: true };

        // // Find the document
        // Programme.findOneAndUpdate(query, update, options, function(err, result) {
        //     if (err) return res.send(500, { error: err });
        //     return res.send("succesfully saved");
        // });
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