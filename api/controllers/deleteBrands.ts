import Brand from "../models/brand";
function deleteBrands(req, res) {
  Brand.remove({}, (err, brand) => {
    if (err) res.send(err);
    res.json({ message: "All successfully deleted" });
  });
}

export default deleteBrands;
