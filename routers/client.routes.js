const express = require('express');
const router = express.Router();
const ClientAuth = require('../middlewares/clientAuthentication');
const ClientController = require('../controllers/clientController');

router.get('/', ClientController.findClients);
router.post('/', ClientController.createClient);
router.delete('/:id', ClientAuth, ClientController.deleteClient);
router.put('/:id', ClientController.updateClient);
router.post('/login', ClientController.clientLogin);

module.exports = router;