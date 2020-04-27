var Product = require('../models/product');


//create product function
exports.createProduct = async(req, res) =>{ 
    var newProduct = new Product(req.body);
    console.log(newProduct);
    try{
        await newProduct.save();        
    }catch{
        alert("Something happend at creating product");
    }
    res.redirect('/');
};

//get products function
exports.getProducts = async(req,res)=>{
   let productList= [];
   try{
    productList = await Product.find()
    console.log(productList);
    res.render('index',{products:productList})
   }catch{
    console.log("Something happend at getting products")
    productList=[]
      res.render('index',{products:productList})
   }
    //it will send to the index page when the web start
};


exports.deleteProduct = async(req, res)=> {
    try{
        await Product.findByIdAndRemove(req.params.id)
    }catch{
        alert("Something happend at deleting product");
    }
    res.render('index')
};

exports.updateProduct = async(req, res)=> {
    try{
        await Product.findByIdAndUpdate(req.params.id);
    }catch{
        alert("Something happend at updating product");
    }
     res.render(index);
};