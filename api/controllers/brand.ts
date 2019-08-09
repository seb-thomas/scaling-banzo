import Brand from "../models/brand";

function postBrands(req, res) {
  // create a new instance of the Brand model
  const newBrand = new Brand(req.body);

  // save the brand and check for errors
  newBrand.save((err, brand) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "Brand created!", brand });
    }
  });
}

function getBrands(req, res) {
  Brand.find((err, brands) => {
    if (err) res.send(err);

    res.json(brands);
  });
}

function getBrand(req, res) {
  Brand.findById(req.params.brand_id, (err, brand) => {
    if (err) res.send(err);
    res.json(brand);
  });
}

function putBrand(req, res) {
  // use our brand model to find the brand we want
  Brand.findById(req.params.brand_id, (err, brand) => {
    if (err) res.send(err);

    brand.title = req.body.title; // update the brands info
    brand.pid = req.body.pid; // update the brands info

    // save the brand
    brand.save(err => {
      if (err) res.send(err);

      res.json({ message: "Brand updated!" });
    });
  });
}

function deleteBrand(req, res) {
  Brand.remove(
    {
      _id: req.params.brand_id
    },
    (err, brand) => {
      if (err) res.send(err);

      res.json({ message: "Successfully deleted" });
    }
  );
}

function deleteBrands(req, res) {
  Brand.remove({}, (err, brand) => {
    if (err) res.send(err);
    res.json({ message: "All successfully deleted" });
  });
}

export { postBrands, getBrands, getBrand, putBrand, deleteBrand, deleteBrands };
