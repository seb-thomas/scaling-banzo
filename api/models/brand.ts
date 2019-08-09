import { model, Schema } from "mongoose";

const BrandSchema = new Schema({
  title: String,
  pid: { type: String, unique: true },
  synopsis: String,
  ownership: {
    key: String,
    title: String
  },
  type: { type: String, required: true }
});

export default model("Brand", BrandSchema);
