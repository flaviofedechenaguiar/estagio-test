const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const ClientController = require('../controllers/clientController');

const AdminAuth = require('../middlewares/adminAuthentication');

router.post('/', AdminController.createAdmin);
router.post('/login', AdminController.loginAdmin);

router.get('/clients', AdminAuth, ClientController.findClients);
router.get('/clients/:id', AdminAuth, ClientController.findClientsById);
router.delete('/clients/:id', AdminAuth, ClientController.deleteClient);
router.put('/clients/:id', AdminAuth,ClientController.updateClient);



module.exports = router;