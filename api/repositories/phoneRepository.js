const Phone = require('../models/Phone');
const { Op } = require('sequelize');

const PhoneRepository = {
    create: async function (payload) {
        try {
            await Phone.create(payload);
        }
        catch (err) {
            console.log(err);
        }
    },
    update: async function (id, payload) {
        try {
            await Phone.update(payload, { where: { [Op.and]: [{ type: payload.type }, { ClientId: id }] } })
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = PhoneRepository;