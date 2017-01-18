var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProgrammeSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Programme', ProgrammeSchema);
