var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EpisodeSchema = new Schema({
    title: String,
    pid: { type: String, unique: true },
    date: Date,
    short_synopsis: String,
    medium_synopsis: String,
    long_synopsis: String,
    image: String,
    parent: String,
    books: Array,
    ownership: {
        key: String,
        title: String
    },
    type: String
});

module.exports = mongoose.model('Episode', EpisodeSchema);
