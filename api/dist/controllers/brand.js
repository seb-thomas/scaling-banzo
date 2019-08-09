"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const brand_1 = __importDefault(require("../models/brand"));
function postBrands(req, res) {
    // create a new instance of the Brand model
    const newBrand = new brand_1.default(req.body);
    // save the brand and check for errors
    newBrand.save((err, brand) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ message: "Brand created!", brand });
        }
    });
}
exports.postBrands = postBrands;
function getBrands(req, res) {
    brand_1.default.find((err, brands) => {
        if (err)
            res.send(err);
        res.json(brands);
    });
}
exports.getBrands = getBrands;
function getBrand(req, res) {
    brand_1.default.findById(req.params.brand_id, (err, brand) => {
        if (err)
            res.send(err);
        res.json(brand);
    });
}
exports.getBrand = getBrand;
function putBrand(req, res) {
    // use our brand model to find the brand we want
    brand_1.default.findById(req.params.brand_id, (err, brand) => {
        if (err)
            res.send(err);
        brand.title = req.body.title; // update the brands info
        brand.pid = req.body.pid; // update the brands info
        // save the brand
        brand.save(err => {
            if (err)
                res.send(err);
            res.json({ message: "Brand updated!" });
        });
    });
}
exports.putBrand = putBrand;
function deleteBrand(req, res) {
    brand_1.default.remove({
        _id: req.params.brand_id
    }, (err, brand) => {
        if (err)
            res.send(err);
        res.json({ message: "Successfully deleted" });
    });
}
exports.deleteBrand = deleteBrand;
function deleteBrands(req, res) {
    brand_1.default.remove({}, (err, brand) => {
        if (err)
            res.send(err);
        res.json({ message: "All successfully deleted" });
    });
}
exports.deleteBrands = deleteBrands;
//# sourceMappingURL=brand.js.map