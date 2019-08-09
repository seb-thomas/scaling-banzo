var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BrandSchema = new Schema({
  title: String,
  pid: { type: String, unique: true },
  synopsis: String,
  ownership: {
    key: String,
    title: String
  },
  type: { type: String, required: true }
});

export default mongoose.model("Brand", BrandSchema);
