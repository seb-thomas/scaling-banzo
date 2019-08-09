"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BrandSchema = new mongoose_1.Schema({
    title: String,
    pid: { type: String, unique: true },
    synopsis: String,
    ownership: {
        key: String,
        title: String
    },
    type: { type: String, required: true }
});
exports.default = mongoose_1.model("Brand", BrandSchema);
//# sourceMappingURL=brand.js.map