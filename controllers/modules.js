const config = require('config'),
      rp     = require('request-promise');

// exports
function makeUrls(id) {
    return `${config.bbcApi.base+id}.json`;
           `${config.bbcApi.base+id}./episodes/player.jsonz`
    'http://www.bbc.co.uk/programmes/b006qsq5/episodes/player.json'
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