var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    item: { type: String, unique: true},
    section: {   
        type: String,
        enum: ['Laptops', 'RAMs', 'GPUs', 'Accessories']
    },
    description: String,
    specs: String,
    price: Number
});

module.exports = mongoose.model('Product', productSchema);