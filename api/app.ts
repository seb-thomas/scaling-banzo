import express from "express";
import deleteBrands from "./controllers/deleteBrands";
import { hello } from "./file";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const text = hello();
  deleteBrands("aht", 1);
  res.send(`The sedulous hyena ate the antelope!${text}`);
});
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
