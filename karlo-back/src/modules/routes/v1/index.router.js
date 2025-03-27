const express = require('express');
const router = express.Router();

const userModule = require('../../user');
const businessModule = require('../../business');

//Modules
userModule(router);
businessModule(router);

module.exports = router;
