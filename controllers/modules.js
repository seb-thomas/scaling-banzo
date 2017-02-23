const config = require('config'),
      rp     = require('request-promise');

// exports
function makeUrls(path) {
    return val => config.bbcApi.base+val+path;
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

function hasNextPage(results) {
    const result = results[0];
    const hasNextPage = result.total - result.offset >= 30;

    return {result, hasNextPage};
}

module.exports = {
    getResults: getResults,
    makeUrls: makeUrls,
    filterSucceeded: filterSucceeded,
    hasNextPage: hasNextPage
}