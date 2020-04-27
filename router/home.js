const express = require('express')
const router = express.Router()
const productCtrl = require('../controller/product-controller')


router.get('/', productCtrl.getProducts);

module.exports = router 