const Promise = require("bluebird"),
      config = require('config'),
      Brand = require('../models/brand'),
      Episode = require('../models/episode'),
      modules = require('./modules');

exports.populateBrands = function(req, res) {
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
        .map(config.bbcApi.brandPids, modules.makeUrls(config.bbcApi.brandsPath))
        .map(modules.getResults)
        .then(modules.filterSucceeded)
        .then(findAndUpdate)
        .catch(console.log.bind(console))
        .finally(() => res.json({ message: 'Done' }));
}


exports.populateEpisodeIndex = function(req, res) {
    const brand_pid = req.params.brand_pid.split();

    modules.getEpisodesResults(brand_pid, 29, [])
        .then(modules.findAndUpdate)
        .finally(() => res.json({ message: 'Done' }));
}

exports.populateEpisodes = function(req, res) {
    // 1. Loop over all episode documents
    // 2. Use episode pid to get episode detail json
    //    * Only if flag-already-checked != true
    // 3. Filter results by keywords on long_synopsis
    // 4. On success, save remaining fields to episode document
    //    * On success OR failure, flag pid as having been checked.
}