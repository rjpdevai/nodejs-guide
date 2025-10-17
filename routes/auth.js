const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.get('/resetPassword', authController.getResetPassword);
router.post('/resetPassword', authController.postResetPassword);
router.get('/resetPassword/:token', authController.getPasswordResetForm);
router.post('/passwordResetForm', authController.postPasswordResetForm);


module.exports = router;