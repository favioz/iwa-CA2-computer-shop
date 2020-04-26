
var express = require('express'),
router = express.Router(),
productCtrl = require('../controller/product-controller');

router.post('/product', productCtrl.createProduct);
router.get('/products', productCtrl.getProducts);
router.delete('/product/:id', productCtrl.deleteProduct);
router.put('/product/:id', productCtrl.updateProduct);


module.exports = router;