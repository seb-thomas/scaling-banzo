"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EpisodeSchema = new mongoose_1.Schema({
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
    type: String,
    checked: { type: Boolean, default: false }
});
exports.default = mongoose_1.model("Episode", EpisodeSchema);
//# sourceMappingURL=episode.js.map