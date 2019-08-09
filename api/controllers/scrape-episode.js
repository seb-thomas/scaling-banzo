import axios from "axios";
import cheerio from "cheerio";
import cfg from "../config/default.json";
import config from "config";

const url = "https://www.bbc.co.uk/programmes/m00075jv";

axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const getDescParagraphs = $(".synopsis-toggle__long > p");
    const descParagraphs = [];
    console.log(config.DBHost);

    getDescParagraphs.each(function() {
      const paragraph = $(this).text();
      descParagraphs.push({ paragraph });
    });
    console.log(descParagraphs);
  })
  .catch(console.error);
