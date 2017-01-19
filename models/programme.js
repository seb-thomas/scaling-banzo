var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProgrammeSchema   = new Schema({
    name: String, 
    pid: String,
    shows: Array
});

module.exports = mongoose.model('Programme', ProgrammeSchema);
