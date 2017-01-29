var Promise = require("bluebird");
var rp = require('request-promise');
var Brand = require('../models/brand');
var config = require('../config/config');

exports.populateBrands = function(req, res) {
    const bbcPids = config.bbcApi.brandPids;

    const getResults = bbcPid => {
        let url = `${config.bbcApi.base+bbcPid}.json`;

        return rp({uri: url, json: true, headers: {'User-Agent': 'Request-Promise'}})
            .then(result => ({result, success:true}))
            .catch(error => ({error, success:false}))
    }

    const filterSucceeded = results => results
        .filter(result => result.success)
        .map(result => result.result);

    const findAndUpdate = results => {
        results.map(obj => {
            const brand = obj.programme;

            // Mongoose allows us query db for existing PID and upsert
            const query = { pid: brand.pid };
            const update = {
                title: brand.title,
                pid: brand.pid,
                desc: brand.short_synopsis,
                synopsis: brand.short_synopsis,
                ownership: {
                    key: brand.ownership.service.key,
                    title: brand.ownership.service.title
                },
                type: brand.type
            };
            const options = { upsert: true, new: true };

            // Brand.findOneAndUpdate(query, update, options)
            return Brand.findOneAndUpdate(query, update, options, function(err, doc) {
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