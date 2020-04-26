var Product = require('../models/product');

exports.createProduct = function(req, res) { 
    var newProduct = new Product(req.body);
    newProduct.save(function (err, product) { 
        if (err) { 
            res.status(400).json(err);
            alert("Error at creating product");
        }

        res.json(product); 
});
};

exports.getProducts = function(req, res) {
  Product.find({}, function (err, products) {
    if (err) {
      res.status(400).json(err); 
    } 
    res.render('products');
    
  }); 
};


exports.deleteProduct = function(req, res) {
  Product.findByIdAndRemove(req.params.id, function (err, product) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(product);
  }); 
};

exports.updateProduct = function(req, res) {
  Product.findByIdAndUpdate(req.params.id, function (err, product) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(product);
  }); 
};