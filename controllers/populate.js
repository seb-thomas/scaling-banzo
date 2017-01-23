var Promise = require("bluebird");
var rp = require('request-promise');
var Programme = require('../models/programme');

exports.populateProgrammes = function(req, res) {
    const bbcPids = ['b007qlvb', 'DASDA', 'b006qrpf'];

    const getResults = bbcPid => {
        let url = 'http://www.bbc.co.uk/programmes/'+bbcPid+'.json';

        return rp({uri: url, json: true})
            .then(result => ({result, success:true}))
            .catch(error => ({error, success:false}))
    }

    const filterSucceeded = results => results
        .filter(result => result.success)
        .map(result => result.result);

    const findAndUpdate = results => {
        const data = results.Object.programme;
        
        // Mongoose allows us query db for existing PID and upsert
        const query = { pid: data.pid };
        const update = {
            name: data.title,
            pid: data.pid,
            desc: data.short_synopsis
        };
        const options = { upsert: true, new: true };

        return Programme.findOneAndUpdate(query, update, options)
    }

    Promise
        .map(bbcPids, getResults)
        .then(filterSucceeded)
    // .then(results => {
    //     let succeeded = results
    //         .filter(result => result.success)
    //         .map(result => result.result);
    //     let failed = results
    //         .filter(result => !result.success)
    //         .map(result => result.error);

    //     console.log(results, succeeded, failed);
    // })
    .then(findAndUpdate)
    .catch(console.log.bind(console))
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