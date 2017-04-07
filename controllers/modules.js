const config  = require('config'),
      Promise = require("bluebird"),
      request = require('request-promise'),
      Episode = require('../models/episode');

const requestBBC = request.defaults({
    baseUrl: config.bbcApi.base, 
    json: true, 
    headers: {'User-Agent': 'Request-Promise'}
})

// exports
function makeUrls(path) {
    return val => val+path;
}

function getResults(url) {
    return requestBBC.get(url)
        .then(result => result)
        .catch(err => {
            // Should be a system log
            console.log("Error fetching episodePids:", err);
            return false;
        })
}

function filterSucceeded(results) {
    return results.filter(result => result);
}

const getEpisodesResults = Promise.method((brand_pid, pageNumber, episodePidsSoFar) => {
    const path = brand_pid+config.bbcApi.episodesPath;
    const url = pageNumber === 0 ? path : `${path}?page=${pageNumber}`

    return requestBBC.get(url)
        .then(result => {
            const episodePids = result.episodes.map(el => el.programme.pid);
            if (!episodePids || episodePids.length < 30) {
                return episodePidsSoFar.concat(episodePids);
            } else {
                return getEpisodesResults(brand_pid, pageNumber + 1, episodePidsSoFar.concat(episodePids));
            }
        })
        .catch(err => {
            console.log("Error fetching episodePids:", err);
            return episodePidsSoFar;
        });
});

function findAndUpdate(results) {
    results.map(pid => {
        const query = { pid };
        const update = { pid };
        const options = { upsert: true, new: true };

        return Episode.findOneAndUpdate(query, update, options, function(err, doc) {
            if (err) return console.log(500, { error: err });
            console.log("succesfully saved");
        });
    })
}

module.exports = {
    getResults: getResults,
    makeUrls: makeUrls,
    filterSucceeded: filterSucceeded,
    getEpisodesResults: getEpisodesResults,
    findAndUpdate: findAndUpdate
}