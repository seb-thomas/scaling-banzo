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

module.exports = {
    getResults : getResults,
    makeUrls   : makeUrls
}