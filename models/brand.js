var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BrandSchema   = new Schema({
    title: String,
    pid: { type: String, unique: true },
    synopsis: String,
    ownership: {
        key: String,
        title: String
    },
    type: String
});

module.exports = mongoose.model('Brand', BrandSchema);
