const Client = require('../models/Client');
const { Op } = require('sequelize');

const clientRepository = {
    findAll: async function () {
        try {
            return await Client.findAll();

        } catch (err) {
            console.log(err);
        }
    },
    create: async function (payload) {
        try {
            return await Client.create(payload);
        } catch (err) {
            console.log(err);
        }
    },
    findByEmail: async function (email) {
        try {
            let returnedClient = await Client.findOne({ where: { email: { [Op.eq]: email } } });
            if (returnedClient) {
                return returnedClient
            }
            return null;
        } catch (err) {
            console.log(err);
        }
    },
    findByCpf: async function (cpf) {
        try {
            let returnedClient = await Client.findOne({ where: { cpf: { [Op.eq]: cpf } } });
            if (returnedClient) {
                return returnedClient
            }
            return null;
        } catch (err) {
            console.log(err);
        }
    },
    delete: async function (id) {
        try {
            return await Client.destroy({ where: { id } });
        } catch (err) {
            console.log(err);
        }
    },
    update: async function (id, payload) {
        try {
            return await Client.update(payload, { where: { id } });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = clientRepository;