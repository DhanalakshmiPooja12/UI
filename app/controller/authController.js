const express = require('express');
const constant = require('../../utils/constant');
const isAuthenticate = require('../middleware/authenticateServices');
const authService = require('../services/authServices');
const route = express.Router();


route.post('/',(req, res) => {
    authService.logIn(req.body).then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    })
});


route.post('/password/forgot',isAuthenticate ,(req, res) => {
    authService.forgotPassword(req.body).then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    })
});

route.post('/forgot/reset', (req, res) => {
    authService.resetPassword(req.body).then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    })
});

module.exports = route;