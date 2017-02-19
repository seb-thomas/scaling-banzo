const Promise = require("bluebird"),
      config = require('config'),
      rp = require('request-promise'),
      Brand = require('../models/brand'),
      Episode = require('../models/brand'),
      modules = require('./modules');

exports.populateBrands = function(req, res) {

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
        .map(config.bbcApi.brandPids, modules.makeUrls('.json'))
        .map(modules.getResults)
        .then(filterSucceeded)
        .then(findAndUpdate)
        .catch(console.log.bind(console))
        .finally(() => res.json({ message: 'Done' }));
}


exports.populateEpisodeIndex = function(req, res) {
    // 1. Use brand pid to get episode index
    //    * Should brand pid come from hardcoded pids or saved brand data?
    // 2. Save all episode pids in documents
    // 3. When page 1 is complete, move to page 2 and repeat

    // Use :brand_id: to specify one brand at a time. (or brand pid)

}

exports.populateEpisodes = function(req, res) {
    // 1. Loop over all episode documents
    // 2. Use episode pid to get episode detail json
    // 3. Filter results by keywords on long_synopsis
    // 4. On success, save remaining fields to episode document
}