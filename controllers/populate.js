var request = require('request');

exports.populateProgrammes = function(req, res) {
    var programmes = ['b007qlvb'];

    request('http://www.bbc.co.uk/programmes/'+programmes[0]+'.json', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body) // Show the HTML for the Google homepage.
      }
    })

    res.send('im a-populatin');
}