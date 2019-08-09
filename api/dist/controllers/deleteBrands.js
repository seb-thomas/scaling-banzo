"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const brand_1 = __importDefault(require("../models/brand"));
function deleteBrands(req, res) {
    brand_1.default.remove({}, (err, brand) => {
        if (err)
            res.send(err);
        res.json({ message: "All successfully deleted" });
    });
}
exports.default = deleteBrands;
//# sourceMappingURL=deleteBrands.js.map