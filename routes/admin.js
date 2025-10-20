const express = require('express');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');
const { body } = require('express-validator');
const router = express.Router();

router.get('/admin/add-product', isAuth, adminController.getAddProduct);

router.post('/admin/add-product',
    [
        body('title')
            .trim()
            .isString()
            .isLength({ min: 3 }),
        body('price')
            .isFloat(),
        body('description')
            .trim()
            .isLength({ min: 5, max: 200 })
    ]
    , isAuth, adminController.postAddProduct);

router.get('/admin/products', isAuth, adminController.getProducts);

router.get('/admin/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/admin/edit-product',
    [
        body('title')
            .trim()
            .isString()
            .isLength({ min: 3 }),
        body('price')
            .isFloat(),
        body('description')
            .trim()
            .isLength({ min: 5, max: 200 })
    ]
    , isAuth, adminController.postEditProduct);

router.post('/admin/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;