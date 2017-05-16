const Promise = require('bluebird'),
      config = require('config'),
      Brand = require('../models/brand'),
      Episode = require('../models/episode'),
      modules = require('./modules');

exports.populateBrands = (req, res) => {
    Promise
        .map(config.bbcApi.brandPids, modules.makeUrls(config.bbcApi.jsonPath))
        .map(modules.getResults)
        .then(modules.filterSucceeded)
        .map(obj => {
            const brand = obj.programme;

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
            modules.doFindOneAndUpdate(Brand, query, update);
        })
        .finally(() => res.json({ message: 'Done' }));
}

exports.populateEpisodeIndex = (req, res) => {
    const brand_pid = req.params.brand_pid.split();

    modules.getEpisodesResults(brand_pid, 29, [])
        .map(pid => {
            modules.doFindOneAndUpdate(Episode, { pid }, { pid });
        })
        .finally(() => res.json({ message: 'Done' }));
}

exports.populateEpisodes = (req, res) => {
    const cursor = Episode.find({ checked: {$ne: true} }).limit(10).cursor();

    cursor
        .eachAsync(document => modules.getEpisodeDetails(document))
        .finally(() => res.json({ message: 'Done' }));
}