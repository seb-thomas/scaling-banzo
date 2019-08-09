"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deleteBrands_1 = __importDefault(require("./controllers/deleteBrands"));
const file_1 = require("./file");
const app = express_1.default();
const port = 3000;
app.get("/", (req, res) => {
    const text = file_1.hello();
    deleteBrands_1.default("aht", 1);
    res.send(`The sedulous hyena ate the antelope!${text}`);
});
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map