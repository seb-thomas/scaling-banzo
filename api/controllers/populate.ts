import { map } from "bluebird";
import { bbcApi } from "config";
import Brand from "../models/brand";
import Episode from "../models/episode";
import {
  doFindOneAndUpdate,
  filterSucceeded,
  getEpisodeDetails,
  getEpisodesResults,
  getResults,
  makeUrls
} from "./modules";

export function populateBrands(req, res) {
  map(bbcApi.brandPids, makeUrls(bbcApi.jsonPath))
    .map(getResults)
    .then(filterSucceeded)
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
      doFindOneAndUpdate(Brand, query, update);
    })
    .finally(() => res.json({ message: "Done" }));
}

export function populateEpisodeIndex(req, res) {
  const brand_pid = req.params.brand_pid.split();

  getEpisodesResults(brand_pid, 29, [])
    .map(pid => {
      doFindOneAndUpdate(Episode, { pid }, { pid });
    })
    .finally(() => res.json({ message: "Done" }));
}

export function populateEpisodes(req, res) {
  const cursor = Episode.find({ checked: { $ne: true } })
    .limit(10)
    .cursor();

  cursor
    .eachAsync(document => getEpisodeDetails(document))
    .finally(() => res.json({ message: "Done" }));
}
