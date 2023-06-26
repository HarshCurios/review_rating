const express = require('express');
const user = require('../controllers/userController');


const router = express.Router();

router.post('/createuser'  , user.createUser);

module.exports = router