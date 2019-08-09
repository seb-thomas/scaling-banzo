"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const episode_1 = __importDefault(require("../models/episode"));
function getEpisodes(req, res) {
    episode_1.default.find((err, episodes) => {
        if (err)
            res.send(err);
        res.json(episodes);
    });
    // Promise version
    // Episode.find().exec()
    //   .then(episodes => res.json(episodes))
    //   .catch(err => res.send(err));
}
exports.getEpisodes = getEpisodes;
function deleteEpisodes(req, res) {
    episode_1.default.remove({}, (err, episode) => {
        if (err)
            res.send(err);
        res.json({ message: "All successfully deleted" });
    });
}
exports.deleteEpisodes = deleteEpisodes;
//# sourceMappingURL=episode.js.map