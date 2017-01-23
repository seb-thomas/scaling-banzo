var Promise = require("bluebird");
var rp = require('request-promise');
var Programme = require('../models/programme');
var config = require('../config/config');

exports.populateProgrammes = function(req, res) {
    const bbcPids = config.bbcApi.brandPids;

    const getResults = bbcPid => {
        let url = config.bbcApi.base+bbcPid+'.json';

        return rp({uri: url, json: true, headers: {'User-Agent': 'Request-Promise'}})
            .then(result => ({result, success:true}))
            .catch(error => ({error, success:false}))
    }

    const filterSucceeded = results => results
        .filter(result => result.success)
        .map(result => result.result);

    const findAndUpdate = results => {
        results.map(obj => {
            const programme = obj.programme;
            
            // Mongoose allows us query db for existing PID and upsert
            const query = { pid: programme.pid };
            const update = {
                name: programme.title,
                pid: programme.pid,
                desc: programme.short_synopsis
            };
            const options = { upsert: true, new: true };

            // Programme.findOneAndUpdate(query, update, options)
            return Programme.findOneAndUpdate(query, update, options, function(err, doc) {
                if (err) return console.log(500, { error: err });
                console.log("succesfully saved");
            });
        })
    }

    Promise
        .map(bbcPids, getResults)
        .then(filterSucceeded)
        .then(findAndUpdate)
        .catch(console.log.bind(console))
        .finally(() => res.json({ message: 'Done' }));
}