var Product = require('../models/product');

exports.createProduct = async function(req, res) { 
    var newProduct = new Product(req.body);
    newProduct.save(function (err, product) { 
        if (err) { 
            res.status(400).json(err);
            alert("Error at creating product");
        }

        res.json(product); 
});
};

exports.getProducts = async function(req, res) {
  
   var products = await Product.find({});
   res.render(index)
};


exports.deleteProduct = async function(req, res) {
  Product.findByIdAndRemove(req.params.id, function (err, product) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(product);
  }); 
};

exports.updateProduct = async function(req, res) {
  Product.findByIdAndUpdate(req.params.id, function (err, product) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(product);
  }); 
};