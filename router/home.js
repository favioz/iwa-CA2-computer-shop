const express = require('express')
const router = express.Router()
const productCtrl = require('../controller/product-controller')

//routing to the index page and populating table dinamically
router.get('/', productCtrl.getProducts);

module.exports = router 