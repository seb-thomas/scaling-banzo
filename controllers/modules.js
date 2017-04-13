const config  = require('config'),
      Promise = require("bluebird"),
      request = require('request-promise');

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
        .then(result => {
            debugger
            return result;
        })
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

function includesString(substringArray, string) {
  return substringArray.some(value => string.includes(value));
}

const getEpisodeDetails = Promise.method((document) => {
    const url = document.pid+config.bbcApi.jsonPath;

    return requestBBC.get(url)
        .then(result => {
            const string = JSON.stringify(result.programme.long_synopsis);

            if (includesString(config.keywordsArray, string)) {
                const episode = result.programme;

                document.set({
                    title: episode.title,
                    date: episode.first_broadcast_date,
                    short_synopsis: episode.short_synopsis,
                    medium_synopsis: episode.medium_synopsis,
                    long_synopsis: episode.long_synopsis,
                    parent: episode.parent.programme.pid,
                    ownership: {
                        key: episode.ownership.service.key,
                        title: episode.ownership.service.title
                    },
                    type: episode.type
                })
            }

            return document;
        })
        .then((document) => {
            document
                .set({ checked: true })
                .save(err => {
                    if (err)
                        return err;
                });
        })
        .catch(err => {
            console.log(`Error fetching episode: ${url}`, err);
        });
})

const doFindOneAndUpdate = (Model, query, update) => {
    const options = { upsert: true, new: true };

    return Model.findOneAndUpdate(query, update, options, (err, doc) => {
        if (err) return console.log(500, { error: err });
        console.log("succesfully saved");
    });
}

module.exports = {
    getResults,
    makeUrls,
    filterSucceeded,
    getEpisodesResults,
    getEpisodeDetails,
    includesString,
    doFindOneAndUpdate
}