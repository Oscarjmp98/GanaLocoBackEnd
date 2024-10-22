const express = require('express');
const router = express.Router();
const Controller = require('./controllers/Controller.js');

router
    .post('/login', Controller.loginUser)
    .post('/createUser', Controller.createUser)
module.exports = router;
