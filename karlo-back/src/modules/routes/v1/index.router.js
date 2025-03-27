const express = require('express');
const router = express.Router();

const userModule = require('../../user');
const businessModule = require('../../business');
const productModule = require('../../product');

//Modules
userModule(router);
businessModule(router);
productModule(router);

module.exports = router;
