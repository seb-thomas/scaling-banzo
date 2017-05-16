var Episode = require('../models/episode');

exports.getEpisodes = (req, res) => {
    Episode.find((err, episodes) => {
        if (err)
            res.send(err);

        res.json(episodes);
    });

    // Promise version
    // Episode.find().exec()
    //   .then(episodes => res.json(episodes))
    //   .catch(err => res.send(err));
}

exports.deleteEpisodes = (req, res) => {
    Episode.remove({}, (err, episode) => {
        if (err)
            res.send(err);

        res.json({ message: 'All successfully deleted' });
    });
}