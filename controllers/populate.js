const Promise = require("bluebird"),
      config = require('config'),
      Brand = require('../models/brand'),
      Episode = require('../models/episode'),
      modules = require('./modules');

exports.populateBrands = (req, res) => {
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
            return Brand.findOneAndUpdate(query, update, options, (err, doc) => {
                if (err) return console.log(500, { error: err });
                console.log("succesfully saved");
            });
        })
    }

    Promise
        .map(config.bbcApi.brandPids, modules.makeUrls(config.bbcApi.jsonPath))
        .map(modules.getResults)
        .then(modules.filterSucceeded)
        .then(findAndUpdate)
        .catch(console.log.bind(console))
        .finally(() => res.json({ message: 'Done' }));
}


exports.populateEpisodeIndex = (req, res) => {
    const brand_pid = req.params.brand_pid.split();

    modules.getEpisodesResults(brand_pid, 29, [])
        .then(modules.findAndUpdate)
        .finally(() => res.json({ message: 'Done' }));
}

exports.populateEpisodes = (req, res) => {
    const cursor = Episode.find({ checked: {$ne: false} }).limit(10).cursor();

    cursor
        .eachAsync(document => modules.getEpisodeDetails(document))
        .finally(() => res.json({ message: 'Done' }));
}