var Product = require('../models/product');


//create product function
exports.createProduct = async(req, res) =>{ 
     console.log("description: " + req.body.description);
        var sectionName='Laptops';
        switch(req.body.sec_n){
            case 1:
            sectionName = 'RAMs';
            break;
            case 2:
            sectionName = 'GPUs';
            break;
            case 3:
            sectionName = 'Accesories';
            break;
        }

        var newProduct = new Product({
            
            item: req.body.item,
            section: sectionName,
            specs: req.body.specs,
            price: req.body.price,
            description: req.body.description
            
        });
    var newProduct = new Product(req.body);
    try{
        await newProduct.save();        
    }catch{
        console.log("Something happend at creating product");
        console.error();
        
    }
    res.redirect('/');
};

//get products function
exports.getProducts = async(req,res)=>{
   let productList= [];
   try{
    productList = await Product.find()
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
        console.log("trying to delete product with with id " + req.params.id);
        res.redirect('/');
    }catch{
        console.log("something happend in deleting product")
        res.redirect('/');
    }
    
};

exports.updateProduct = async(req, res)=> {
    try{
        console.log("description: " + req.body.id);
        var sectionName='Laptops';
        switch(req.body.sec_n){
            case 1:
            sectionName = 'RAMs';
            break;
            case 2:
            sectionName = 'GPUs';
            break;
            case 3:
            sectionName = 'Accesories';
            break;
        }

        let newProduct = await Product.findById(req.body.id);

            newProduct.item= req.body.itemName;
            newProduct.section= sectionName;
            newProduct.specs= req.body.specs;
            newProduct.price= req.body.price;
            newProduct.description= req.body.description;
            
        
        console.log("product to update" + newProduct);
        await newProduct.save();
        res.redirect('/');
    }catch(error){
        console.log("something happened at updating")
        console.log(error);
        res.redirect('/');
    }
    
};