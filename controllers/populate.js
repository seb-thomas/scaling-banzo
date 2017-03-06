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

    const collect = results => {
        console.log(results)
        // Object {result: Object, hasNextPage: true}
        // hasNextPage: true
        // result: Object
            // episodes: Array[30] 
            // offset: 0 
            // page: 1
            // total: 2151
    }

    // const getResultsHelper = Promise.method((pageNumber, catsSoFar) => {
    //     const path = config.bbcApi.base+brand_pid+config.bbcApi.episodesPath;
    //     const url = pageNumber === 0 ? path : `${path}?page=${pageNumber}`
    //     // www.bbc.co.uk/programmes/b006tp43/episodes/player.json?page=29

    //     return request.get(url)
    //         .then((adoptionsPage) => {
    //             const cats = cheerio(adoptionsPage)
    //                 .find("a")
    //                 .filter((i, tag) => tag.attribs.href && tag.attribs.href.match(/adoptions\/pet-details\/\d+/))
    //                 .map((i, tag) => `${SFSPCA_BASE}${tag.attribs.href}`)
    //                 .toArray();
    //             if (!cats || cats.length === 0) {
    //                 return catsSoFar;
    //             } else {
    //                 return getResultsHelper(pageNumber + 1, catsSoFar.concat(cats));
    //             }
    //         })
    //         .catch((err) => {
    //             console.log("Error fetching cats:", err);
    //             return catsSoFar;
    //         });
    // });
    // const getResults = () => getResultsHelper(0, []);

    // make url from pid
    // query api with url
    // Add results to db
    // if has next page
    // Add to page index
    // Add to url
    // query api with url

    const findAndUpdate = results => {
        results.result.episodes.map(obj => {
            const episode = obj.programme;

            // Mongoose allows us query db for existing PID and upsert
            const query = { pid: episode.pid };
            const update = { pid: episode.pid };
            const options = { upsert: true, new: true };

            // Brand.findOneAndUpdate(query, update, options)
            return Episode.findOneAndUpdate(query, update, options, function(err, doc) {
                if (err) return console.log(500, { error: err });
                console.log("succesfully saved");
            });
        })
    }

    Promise
        .map(brand_pid, modules.makeUrls(config.bbcApi.episodesPath))
        .map(modules.getResults)
        .then(modules.filterSucceeded)
        .then(modules.hasNextPage)
        .then(collect)
        .then(findAndUpdate)
        .then(console.log.bind(console))
        .finally(() => res.json({ message: 'Done' }));
    // 1. Use brand pid to get episode index
    //    * Should brand pid come from hardcoded pids or saved brand data?
    // 2. Save all episode pids in documents
    // 3. When page 1 is complete, move to page 2 and repeat

    // Use :brand_id: to specify one brand at a time. (or brand pid)

}

exports.populateEpisodes = function(req, res) {
    // 1. Loop over all episode documents
    // 2. Use episode pid to get episode detail json
    //    * Only if flag-already-checked != true
    // 3. Filter results by keywords on long_synopsis
    // 4. On success, save remaining fields to episode document
    //    * On success OR failure, flag pid as having been checked.
}