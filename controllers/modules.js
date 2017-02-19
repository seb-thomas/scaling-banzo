const config = require('config'),
      rp     = require('request-promise');

// exports
function makeUrls(url) {
    return val => config.bbcApi.base+val+url;
}

function getResults(url) {
    return rp({uri: url, json: true, headers: {'User-Agent': 'Request-Promise'}})
        .then(result => ({result, success:true}))
        .catch(error => ({error, success:false}))
}


function filterSucceeded(results) {
    return results
        .filter(result => result.success)
        .map(result => result.result);
}

function findAndUpdate(results) {
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

module.exports = {
    getResults: getResults,
    makeUrls: makeUrls,
    filterSucceeded: filterSucceeded,
    findAndUpdate: findAndUpdate
}