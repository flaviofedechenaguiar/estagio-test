const AdminRepository = require('../repositories/adminRepository');
const bcrypt = require('bcrypt');

class ErrorValidation {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
    code() {
        return this.code;
    }
    message() {
        return this.message;
    }
}

class Admin {
    async createAdmin(req, res) {
        try {
            let { email, password } = req.body;
            let existEmail = await AdminRepository.findByEmail(email);
            if (existEmail) {
                throw new ErrorValidation(400, 'Email já presente no sistema');
            }
            if (email == '' || email == ' ' || email == undefined) {
                throw new ErrorValidation(400, 'Preencha o campo de email');
            }
            if (password == '' || password == ' ' || password == undefined) {
                throw new ErrorValidation(400, 'Preencha o campo de senha');
            }
            bcrypt.hash(password, 10, async (err, hashPassword) => {
                if (!err) {
                    await AdminRepository.create({ email, password: hashPassword });
                } else {
                    throw new ErrorValidation(500, 'Erro ao hashear a senha!');
                }
            });
            return res.status(201).json({ message: "Admin criado com sucesso!" });
        } catch (err) {
            if (err instanceof ErrorValidation) {
                return res.status(err.code).json({ error: err.message });
            } else {
                return res.status(500).json({ message: 'Um erro aconteceu ao utilizar a base de dados.' });
            }
        }
    }
}

module.exports = new Admin;

