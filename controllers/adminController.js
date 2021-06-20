const AdminRepository = require('../repositories/adminRepository');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

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
    async loginAdmin(req, res) {
        try {
            let { email, password } = req.body;
            let returnedAdmin = await AdminRepository.findByEmail(email);
            console.log(returnedAdmin);
            if (returnedAdmin) {
                bcrypt.compare(password, returnedAdmin.password, async (err, result) => {
                    try {
                        if (!err) {
                            if (result) {
                                let token = JWT.sign({ type: 'admin', id: returnedAdmin.id, email: returnedAdmin.email },
                                    process.env.JWT_SECRET, { expiresIn: '60m' });
                                return res.status(200).json({ message: 'Admin logado com sucesso!', token });
                            }
                            throw new ErrorValidation(202, 'Email ou senha incorretos!');
                        }
                        throw new ErrorValidation(500, 'Um error ocorreu ao efetuar o login');
                    } catch (err) {
                        if (err instanceof ErrorValidation) {
                            return res.status(err.code).json({ error: err.message });
                        } else {
                            console.log(err);
                            return res.status(500).json({ message: 'Um erro aconteceu ao utilizar a base de dados.' });
                        }
                    }
                });
            } else {
                return res.status(400).json({ message: 'Email/senha incorretos!' });
            }
        } catch (err) {
            if (err instanceof ErrorValidation) {
                return res.status(err.code).json({ error: err.message });
            } else {
                console.log(err);
                return res.status(500).json({ message: 'Um erro aconteceu ao utilizar a base de dados.' });
            }
        }
    }


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

