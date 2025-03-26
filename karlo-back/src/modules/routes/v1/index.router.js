const express = require('express');
const router = express.Router();

const userModule = require('../../user');

//Modules
userModule(router);

module.exports = router;
