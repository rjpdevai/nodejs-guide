const express = require('express');
const authController = require('../controllers/auth');
const { check, body } = require('express-validator')
const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login',
    [
        check('email')
            .isEmail()
            .withMessage('Please enter valid email')
            .normalizeEmail(),
        body('password', 'Please enter valid password')
            .isLength({ min: 3 })
            .isAlphanumeric()
            .trim()
    ],
    authController.postLogin);

router.post('/logout', authController.postLogout);

router.get('/signup', authController.getSignup);

router.post('/signup',
    [
        check('email')
            .isEmail()
            .withMessage('Please enter valid email')
            .normalizeEmail(),
        body('password', 'Password should be combination of letters and numbers minimum length should be 3')
            .isLength({ min: 3 })
            .isAlphanumeric()
            .trim(),
        body('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Confirm password not match');
            }
            return true;
        })
    ],
    authController.postSignup);

router.get('/resetPassword', authController.getResetPassword);

router.post('/resetPassword', authController.postResetPassword);

router.get('/resetPassword/:token', authController.getPasswordResetForm);

router.post('/passwordResetForm', authController.postPasswordResetForm);


module.exports = router;