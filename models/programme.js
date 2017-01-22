var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProgrammeSchema   = new Schema({
    name: String,
    pid: { type: String, unique: true },
    desc: String,
    shows: Array
});

module.exports = mongoose.model('Programme', ProgrammeSchema);
