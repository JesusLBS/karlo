const express = require('express');
const router = express.Router();

const userModule = require('../../user');
const businessModule = require('../../business');
const productModule = require('../../product');
const authModule = require('../../auth');

//Modules
userModule(router);
businessModule(router);
productModule(router);
authModule(router);

module.exports = router;
