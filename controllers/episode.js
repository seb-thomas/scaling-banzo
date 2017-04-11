var Episode = require('../models/episode');

exports.getEpisodes = function(req, res) {
    Episode.find(function(err, episodes) {
        if (err)
            res.send(err);

        res.json(episodes);
    });

    // Promise version
    // Episode.find().exec()
    //   .then(episodes => res.json(episodes))
    //   .catch(err => res.send(err));
}

exports.deleteEpisodes = function(req, res) {
    Episode.remove({}, function(err, episode) {
        if (err)
            res.send(err);

        res.json({ message: 'All successfully deleted' });
    });
}