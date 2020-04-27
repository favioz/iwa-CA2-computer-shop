
var express = require('express'),
router = express.Router(),
productCtrl = require('../controller/product-controller');

router.post('/', productCtrl.createProduct);
router.post('/:id', productCtrl.deleteProduct);
router.put('/', productCtrl.updateProduct);
router.get('/', productCtrl.getProducts);


module.exports = router;