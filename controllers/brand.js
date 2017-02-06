var Brand = require('../models/brand');

exports.postBrands = function(req, res) {
    // create a new instance of the Brand model
    var newBrand = new Brand(req.body);

    // save the brand and check for errors
    newBrand.save((err, brand) => {
        if (err){
            res.send(err);
        } else {
            res.json({ message: 'Brand created!', brand });
        }
    });
}

exports.getBrands = function(req, res) {
    Brand.find(function(err, brands) {
        if (err)
            res.send(err);

        res.json(brands);
    });
}

exports.getBrand = function(req, res) {
    Brand.findById(req.params.brand_id, function(err, brand) {
        if (err)
            res.send(err);
        res.json(brand);
    });
}

exports.putBrand = function(req, res) {
    // use our brand model to find the brand we want
    Brand.findById(req.params.brand_id, function(err, brand) {

        if (err)
            res.send(err);

        brand.title = req.body.title;  // update the brands info
        brand.pid = req.body.pid;  // update the brands info

        // save the brand
        brand.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Brand updated!' });
        });

    });
}

exports.deleteBrand = function(req, res) {
    Brand.remove({
        _id: req.params.brand_id
    }, function(err, brand) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
}

exports.deleteBrands = function(req, res) {
    Brand.remove({}, function(err, brand) {
        if (err)
            res.send(err);

        res.json({ message: 'All successfully deleted' });
    });
}