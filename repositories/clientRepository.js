const Client = require('../models/Client');
const { Op } = require('sequelize');
const Phone = require('../models/Phone');

const clientRepository = {
    findAll: async function () {
        try {
            return await Client.findAll();

        } catch (err) {
            console.log(err);
        }
    },
    findById: async function (id) {
        try {
            return await Client.findByPk(id, { include: [{ model: Phone }] });
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
    findByName: async function (name) {
        try {
            return await Client.findAll({ where: { name: { [Op.substring]: name } } });
        } catch (err) {
            console.log(err);
        }
    },

    findBySex: async function (sex) {
        try {
            return await Client.findAll({ where: { sex: { [Op.eq]: sex } } });
        } catch (err) {
            console.log(err);
        }
    },
    findByState: async function (state) {
        try {
            return await Client.findAll({ where: { state: { [Op.eq]: state } } });
        } catch (err) {
            console.log(err);
        }
    },
    findByCreatedAt: async function (createdDate) {
        try {
            return await Client.findAll({ where: { createdAt: { [Op.substring]: createdDate } } });
        } catch (err) {
            console.log(err);
        }
    }
    ,
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