var Promise = require("bluebird");
var rp = require('request-promise');
var Programme = require('../models/programme');

exports.populateProgrammes = function(req, res) {
    let programmes = ['b007qlvb', 'b006qsq5', 'b006qrpf', 'b006tp43', 'b006qp6p', 'b006qgj4', 'b006r9xr', 'b006tnsf'];

    var options = {
        uri: 'http://www.bbc.co.uk/programmes/b006qsq5.json',
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };

    rp(options)
        .then(function (body) {
            // Mongoose allows us query db for existing PID and upsert
            var query = {pid: body.programme.pid},
                update = {
                    name: body.programme.title,
                    pid: body.programme.pid,
                    desc: body.programme.short_synopsis
                },
                options = { upsert: true, new: true };

            // Find the document
            Programme.findOneAndUpdate(query, update, options, function(err, result) {
                if (err) return res.send(500, { error: err });
                return res.send("succesfully saved");
            });
        })
        .catch(function (err) {
            return res.send(err);
        })
        .finally(function () {
            // This is called after the request finishes either successful or not successful.
            // return res.json({ message: 'Programme updated! (maybe)' });
        });
    // create request objects
    // var requests = [{
    //   url: 'https://jsonplaceholder.typicode.com/posts',
    //   headers: {
    //     'User-Agent': 'Request-Promise'
    //   }
    // }, {
    //   url: 'https://jsonplaceholder.typicode.com/comments',
    //   headers: {
    //     'User-Agent': 'Request-Promise'
    //   }
    // }];

    // Promise.map(requests, function(obj) {
    //   return rp(obj).then(function(body) {
    //     console.log(body)
    //     // return JSON.parse(body);
    //   });
    // })
    // .then(function(results) {
    //   // console.log(results);
    //   // for (var i = 0; i < results.length; i++) {
    //   //   console.log(results[i])
    //   // }
    // }, function(err) {
    //   // handle all your errors here
    // });
    // const urls = ['http://google.be', 'http://plonko.co.uk']

    // Promise.map(urls, rp)
    //   .map((htmlOnePage, index) => {
    //     // const $ = cheerio.load(htmlOnePage);
    //     // const share = $('.nb-shares').html();
    //     // let shareTuple = {};
    //     // shareTuple[urls[index]] = share;
    //     return htmlOnePage;
    //   })
    //   .then(console.log)
    //   .catch((e) => console.log('We encountered an error' + e));


    // var request1 = rp('http://www.bbc.co.uk/programmes/b006qsq5.json');
    // var request2 = rp('http://www.bbc.co.uk/programmes/b006qrpf.json');
    // // var request3 = rp(paramsReq3);

    // Promise.each([request1, request2])
    //     .then(function (body) {
    //         // All requests succeeded.
    //         // Process the responses now.
    //         return console.log(body);
    //         res.end()
    //     })
    //     .catch(console.log.bind(console));
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