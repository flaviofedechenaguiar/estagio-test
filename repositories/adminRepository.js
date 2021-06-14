const Admin = require('../models/Admin');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const AdminRepository = {
    create: async function (payload) {
        try {
            await Admin.create({ email: payload.email, password: payload.password });
        } catch (err) {
            console.log(err);
        }
    },
    findByEmail: async function (email) {
        try {
            let returnedEmail = await Admin.findOne({ where: { email: { [Op.eq]: email } } });
            if (returnedEmail) {
                return returnedEmail;
            }
            return null;
        } catch (err) {
            console.log(err);
        }
    }

};

module.exports = AdminRepository;