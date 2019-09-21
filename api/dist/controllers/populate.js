"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = require("bluebird");
const config_1 = require("config");
const brand_1 = __importDefault(require("../models/brand"));
const episode_1 = __importDefault(require("../models/episode"));
const modules_1 = require("./modules");
function populateBrands(req, res) {
    bluebird_1.map(config_1.bbcApi.brandPids, modules_1.makeUrls(config_1.bbcApi.jsonPath))
        .map(modules_1.getResults)
        .then(modules_1.filterSucceeded)
        .map(obj => {
        const brand = obj.programme;
        const query = { pid: brand.pid };
        const update = {
            ownership: {
                key: brand.ownership.service.key,
                title: brand.ownership.service.title
            },
            pid: brand.pid,
            synopsis: brand.short_synopsis,
            title: brand.title,
            type: brand.type
        };
        modules_1.doFindOneAndUpdate(brand_1.default, query, update);
    })
        .finally(() => res.json({ message: "Done" }));
}
exports.populateBrands = populateBrands;
function populateEpisodeIndex(req, res) {
    const brand_pid = req.params.brand_pid.split();
    modules_1.getEpisodesResults(brand_pid, 29, [])
        .map(pid => {
        modules_1.doFindOneAndUpdate(episode_1.default, { pid }, { pid });
    })
        .finally(() => res.json({ message: "Done" }));
}
exports.populateEpisodeIndex = populateEpisodeIndex;
function populateEpisodes(req, res) {
    const cursor = episode_1.default.find({ checked: { $ne: true } })
        .limit(10)
        .cursor();
    cursor
        .eachAsync(document => modules_1.getEpisodeDetails(document))
        .finally(() => res.json({ message: "Done" }));
}
exports.populateEpisodes = populateEpisodes;
//# sourceMappingURL=populate.js.map