var Product = require('../models/product');

exports.createProduct = async (req, res) =>{ 
    var newProduct = new Product(req.body);
    
    try{
        await newProduct.save();        
    }catch{
        alert("Something happend at creating product");
    }
    res.render('index')
};

exports.getProducts = async =>(req, res) {
  try{
    var products = await Product.find({});
  }catch{
    alert("Something happend at retrieving products");
  }
   
   res.render(index);
};


exports.deleteProduct = async =>(req, res) {
    try{
        await Product.findByIdAndRemove(req.params.id)
    }catch{
        alert("Something happend at deleting product");
    }
    res.render('index')
};

exports.updateProduct = async =>(req, res) {
    try{
        await Product.findByIdAndUpdate(req.params.id);
    }catch{
        alert("Something happend at updating product");
    }
     res.render(index);
};