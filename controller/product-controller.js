var Product = require('../models/product');


//create product function
exports.createProduct = async(req, res) =>{ 
     console.log("section: " + req.body.sec_n);
        var sectionName='Laptops';
        
        if(req.body.sec_n == 1){
            sectionName = 'RAMs';
        }else if(req.body.sec_n == 2){
            sectionName = 'GPUs';
        }else if(req.body.sec_n == 3){
            sectionName = 'Accessories';
        }

        console.log(sectionName);

        var newProduct = new Product({
            
            item: req.body.item,
            section: sectionName,
            specs: req.body.specs,
            price: req.body.price,
            description: req.body.description
            
        });
    try{
        await newProduct.save();        
    }catch(error){
        console.log("Something happend at creating product");
        console.log(error);      
    }
    //redirecting to index page, therefore will update table
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
    
   //rendering index page, sending the fetched products
};


//delete product function
exports.deleteProduct = async(req, res)=> {
    try{
        await Product.findByIdAndRemove(req.params.id)
        console.log("trying to delete product with with id " + req.params.id);
        res.redirect('/');
    }catch(error){
        console.log("something happend in deleting product")
        console.log(error);
        res.redirect('/');
    }
    
};

//update products function
exports.updateProduct = async(req, res)=> {
    try{
        console.log("sec index at update: " + req.body.sec_n);
        var sectionName='Laptops';

        if(req.body.sec_n == 1){
            sectionName = 'RAMs';
        }else if(req.body.sec_n == 2){
            sectionName = 'GPUs';
        }else if(req.body.sec_n == 3){
            sectionName = 'Accessories';
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