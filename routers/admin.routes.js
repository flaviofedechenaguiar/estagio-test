const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

router.post('/', AdminController.createAdmin);


module.exports = router;