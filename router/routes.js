
var express = require('express'),
router = express.Router(),
productCtrl = require('../controller/product-controller');

router.post('/', productCtrl.createProduct);
router.delete('/:id', productCtrl.deleteProduct);
router.put('/:id', productCtrl.updateProduct);
router.get('/', productCtrl.getProducts);


module.exports = router;