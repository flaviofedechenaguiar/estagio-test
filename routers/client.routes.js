const express = require('express');
const router = express.Router();
const ClientAuth = require('../middlewares/clientAuthentication');
const AdminAuth = require('../middlewares/adminAuthentication');
const ClientController = require('../controllers/clientController');

// router.get('/', ClientController.findClients);
// router.get('/:id', AdminAuth, ClientController.findClientsById);
router.get('/', ClientAuth, ClientController.findClientsById);
router.post('/', ClientController.createClient);
router.delete('/:id', ClientAuth, ClientController.deleteClient);
router.put('/:id', ClientAuth,ClientController.updateClient);
router.post('/login', ClientController.clientLogin);

module.exports = router;