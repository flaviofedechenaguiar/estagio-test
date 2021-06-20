const ClientRepository = require('../repositories/clientRepository');
const CPF = require('cpf');
const bcrypt = require('bcrypt');
const PhoneRepository = require('../repositories/phoneRepository');
const clientRepository = require('../repositories/clientRepository');
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



class Client {

    async clientLogin(req, res) {
        try {
            let { email, password } = req.body;
            let returnedClient = await ClientRepository.findByEmail(email);
            if (returnedClient) {
                bcrypt.compare(password, returnedClient.password, async (err, result) => {
                    try {
                        if (!err) {
                            if (result) {
                                let token = JWT.sign({ type: 'client', id: returnedClient.id, email: returnedClient.email },
                                    process.env.JWT_SECRET, { expiresIn: '60m' });
                                return res.status(200).json({ message: 'Cliente logado com sucesso', token: token });
                            }
                            throw new ErrorValidation(400, 'Email/senha incorretos');
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
                return res.status(400).json({ error: 'Email/senha incorretos' });
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

    async findClients(req, res) {
        try {
            let { name, sex, state, createdDate } = req.query;
            if (name) {
                let findByName = await ClientRepository.findByName(name);
                return res.status(200).json({ clients: findByName });
            }
            if (sex) {
                let findBySex = await ClientRepository.findBySex(sex);
                return res.status(200).json({ clients: findBySex });
            }
            if (state) {
                let findByState = await ClientRepository.findByState(state);
                return res.status(200).json({ clients: findByState });
            }
            if (createdDate) {
                let findByCreatedDate = await ClientRepository.findByCreatedAt(createdDate);
                return res.status(200).json({ clients: findByCreatedDate });
            }
            let returnedClients = await ClientRepository.findAll();
            return res.status(200).json({ clients: returnedClients });
        } catch (err) {
            if (err instanceof ErrorValidation) {
                return res.status(err.code).json({ error: err.message });
            } else {
                console.log(err);
                return res.status(500).json({ message: 'Um erro aconteceu ao utilizar a base de dados.' });
            }
        }
    }

    async findClientsById(req, res) {
        try {
            let { id } = req.params;
            let returnedClients = await ClientRepository.findById(id);
            if (returnedClients) {
                return res.status(200).json(returnedClients);
            } else {
                throw new ErrorValidation(400, 'Cliente não encontrado de acordo com o id');
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

    async createClient(req, res) {
        try {
            let { name, birth, cpf, rg, sex, zipCode, address, number, district, complement, state,
                city, email, password, status, ddPhone, numberPhone, ddCellPhone, numberCellPhone } = req.body;

            if (name == '' || name == ' ' || name == undefined) {
                throw new ErrorValidation(400, 'O nome não pode ser vazio!');
            }
            if (name.length < 3) {
                throw new ErrorValidation(400, 'O nome não pode ter menos de três caracteres!');
            }
            if (name.length > 100) {
                throw new ErrorValidation(400, 'O nome não pode ter mais de cem caracteres!')
            }
            if (birth == '' || birth == ' ' || birth == undefined) {
                throw new ErrorValidation(400, 'A data de nascimento não pode ser vazia!');
            }
            if (new Date(birth) > new Date) {
                throw new ErrorValidation(400, 'A data de nascimento é inválida!');
            }

            let rawCpf = cpf.replace('.', '').replace('.', '').replace('-', '');
            if (rawCpf == '' || rawCpf == ' ' || rawCpf == undefined) {
                throw new ErrorValidation(400, 'O cpf não pode ser vazio!');
            }
            if (!CPF.isValid(rawCpf)) {
                throw new ErrorValidation(400, 'O cpf é inválido');
            }
            if (await ClientRepository.findByCpf(rawCpf)) {
                throw new ErrorValidation(400, 'Cpf já presente no sistema!');
            }


            if (sex == '' || sex == ' ' || sex == undefined) {
                throw new ErrorValidation(400, 'O sexo não pode ser vazio!');
            }
            if (sex != 0 && sex != 1) {
                throw new ErrorValidation(400, 'Codigo de sexo inválido');
            }

            if (rg == '' || rg == ' ' || rg == undefined) {
                throw new ErrorValidation(400, 'O rg não pode ser vazio!');
            }

            if (zipCode == '' || zipCode == ' ' || zipCode == undefined) {
                throw new ErrorValidation(400, 'O cep não pode ser vazio!');
            }

            if (address == '' || address == ' ' || zipCode == undefined) {
                throw new ErrorValidation(400, 'O endereço não pode ser vazio!');
            }

            if (number == '' || number == ' ' || number == undefined) {
                throw new ErrorValidation(400, 'O número não pode ser vazio!');
            }

            if (district == '' || district == ' ' || district == undefined) {
                throw new ErrorValidation(400, 'O bairro não poder ser vazio!');
            }

            if (complement == undefined || complement == ' ') {
                complement = '';
            }

            if (state == '' || state == ' ' || state == undefined) {
                throw new ErrorValidation(400, 'O estado não pode ser vazio!');
            }

            if (city == '' || city == ' ' || city == undefined) {
                throw new ErrorValidation(400, 'A cidade não pode ser vazia!');
            }
            if (status == '' || status == ' ' || status == undefined) {
                throw new ErrorValidation(400, 'O status não pode ser vazio!');
            }
            if (status != 0 && status != 1) {
                throw new ErrorValidation(400, 'O codigo de status é inválido!');
            }
            if (email == '' || email == ' ' || email == undefined) {
                throw new ErrorValidation(400, 'O email não pode ser vazio!');
            }
            if (await ClientRepository.findByEmail(email)) {
                throw new ErrorValidation(400, 'Email já presente no sistema!');
            }
            if (password == '' || password == ' ' || password == undefined) {
                throw new ErrorValidation(400, 'A senha não pode ser vazia!');
            }

            let phones = new Array;
            phones[0] = { type: 0, dd: '', phoneNumber: '' };
            if (ddPhone != '' && ddPhone != ' ' && ddPhone != undefined) {
                if (numberPhone != '' && numberPhone != ' ' && numberPhone != undefined) {
                    phones[0] = { type: 0, dd: ddPhone, phoneNumber: numberPhone };
                } else {
                    throw new ErrorValidation(400, 'Preencha o campo de telefone');
                }
            } else {
                if (numberPhone != '' && numberPhone != ' ' && numberPhone != undefined) {
                    throw new ErrorValidation(400, 'Preencha o campo de DD de telefone');
                }
            }


            if (ddCellPhone != '' && ddCellPhone != ' ' && ddCellPhone != undefined) {
                if (numberCellPhone != '' && numberCellPhone != ' ' && numberCellPhone != undefined) {
                    phones.push({ type: 1, dd: ddCellPhone, phoneNumber: numberCellPhone });
                } else {
                    throw new ErrorValidation(400, 'Preencha o campo de telefone celular');
                }
            } else {
                if (numberCellPhone != '' && numberCellPhone != ' ' && numberCellPhone != undefined) {
                    throw new ErrorValidation(400, 'Preencha o campo de DD de telefone celular');
                } else {
                    throw new ErrorValidation(400, 'Preencha o campo de DD e telefone referente ao celular');
                }
            }
            console.log(req.body, '===================');
            bcrypt.hash(password, 10, async (err, hashPassword) => {
                if (!err) {
                    let createdClient = await ClientRepository.create({
                        name, birth, cpf: rawCpf, rg, sex, zipCode, address, number, district, complement, state,
                        city, email, password: hashPassword, status
                    });
                    
                    phones.forEach(async (phone) => {

                        await PhoneRepository.create({ ...phone, ClientId: createdClient.id });
                    });
                    return res.status(201).json({ message: 'Cliente criado com sucesso!' });
                }
                throw new ErrorValidation(500, 'Um erro aconteceu ao utilizar a base de dados.');
            });
        } catch (err) {
            if (err instanceof ErrorValidation) {
                return res.status(err.code).json({ error: err.message });
            } else {
                console.log(err);
                return res.status(500).json({ message: 'Um erro aconteceu ao utilizar a base de dados.' });
            }
        }

    }

    async updateClient(req, res) {
        try {
            let { id } = req.params;
            let { name, birth, cpf, rg, sex, zipCode, address, number, district, complement, state,
                city, email, password, status, ddPhone, numberPhone, ddCellPhone, numberCellPhone } = req.body;

            if (name == '' || name == ' ' || name == undefined) {
                throw new ErrorValidation(400, 'O nome não pode ser vazio!');
            }
            if (name.length < 3) {
                throw new ErrorValidation(400, 'O nome não pode ter menos de três caracteres!');
            }
            if (name.length > 100) {
                throw new ErrorValidation(400, 'O nome não pode ter mais de cem caracteres!')
            }
            if (birth == '' || birth == ' ' || birth == undefined) {
                throw new ErrorValidation(400, 'A data de nascimento não pode ser vazia!');
            }
            if (new Date(birth) > new Date) {
                throw new ErrorValidation(400, 'A data de nascimento é inválida!');
            }

            let rawCpf = cpf.replace('.', '').replace('.', '').replace('-', '');
            if (rawCpf == '' || rawCpf == ' ' || rawCpf == undefined) {
                throw new ErrorValidation(400, 'O cpf não pode ser vazio!');
            }
            if (!CPF.isValid(rawCpf)) {
                throw new ErrorValidation(400, 'O cpf é inválido');
            }

            let returnedUserByCpf = await clientRepository.findByCpf(rawCpf);
            if (returnedUserByCpf) {
                if (returnedUserByCpf.id != id) {
                    throw new ErrorValidation(400, 'Cpf já presente no sistema!');
                }
            }

            if (sex === '' || sex === ' ' || sex == undefined) {
                throw new ErrorValidation(400, 'O sexo não pode ser vazio!');
            }
            if (sex != 0 && sex != 1) {
                throw new ErrorValidation(400, 'Codigo de sexo inválido');
            }

            if (rg == '' || rg == ' ' || rg == undefined) {
                throw new ErrorValidation(400, 'O rg não pode ser vazio!');
            }

            if (zipCode == '' || zipCode == ' ' || zipCode == undefined) {
                throw new ErrorValidation(400, 'O cep não pode ser vazio!');
            }

            if (address == '' || address == ' ' || zipCode == undefined) {
                throw new ErrorValidation(400, 'O endereço não pode ser vazio!');
            }

            if (number == '' || number == ' ' || number == undefined) {
                throw new ErrorValidation(400, 'O número não pode ser vazio!');
            }

            if (district == '' || district == ' ' || district == undefined) {
                throw new ErrorValidation(400, 'O bairro não poder ser vazio!');
            }

            if (complement == undefined || complement == ' ') {
                complement = '';
            }

            if (state == '' || state == ' ' || state == undefined) {
                throw new ErrorValidation(400, 'O estado não pode ser vazio!');
            }

            if (city == '' || city == ' ' || city == undefined) {
                throw new ErrorValidation(400, 'A cidade não pode ser vazia!');
            }

            if (status === '' || status === ' ' || status == undefined) {
                throw new ErrorValidation(400, 'O status não pode ser vazio!');
            }
            if (status != 0 && status != 1) {
                throw new ErrorValidation(400, 'O codigo de status é inválido!');
            }
            if (email == '' || email == ' ' || email == undefined) {
                throw new ErrorValidation(400, 'O email não pode ser vazio!');
            }

            let returnedUserByEmail = await ClientRepository.findByEmail(email);
            if (returnedUserByEmail) {
                if (returnedUserByEmail.id != id) {
                    throw new ErrorValidation(400, 'Email já presente no sistema!');
                }
            }

            let phones = new Array;
            phones.push({ type: 0, dd: ddPhone, phoneNumber: numberPhone });
            if (ddPhone != '' && ddPhone != ' ' && ddPhone != undefined) {
                if (numberPhone != '' && numberPhone != ' ' && numberPhone != undefined) {
                    phones[0] = { type: 0, dd: ddPhone, phoneNumber: numberPhone };
                } else {
                    throw new ErrorValidation(400, 'Preencha o campo de telefone');
                }
            } else {
                if (numberPhone != '' && numberPhone != ' ' && numberPhone != undefined) {
                    throw new ErrorValidation(400, 'Preencha o campo de DD de telefone');
                }
            }

            if (ddCellPhone != '' && ddCellPhone != ' ' && ddCellPhone != undefined) {
                if (numberCellPhone != '' && numberCellPhone != ' ' && numberCellPhone != undefined) {
                    phones.push({ type: 1, dd: ddCellPhone, phoneNumber: numberCellPhone });
                } else {
                    throw new ErrorValidation(400, 'Preencha o campo de telefone celular');
                }
            } else {
                if (numberCellPhone != '' && numberCellPhone != ' ' && numberCellPhone != undefined) {
                    throw new ErrorValidation(400, 'Preencha o campo de DD de telefone celular');
                } else {
                    throw new ErrorValidation(400, 'Preencha o campo de DD e telefone referente ao celular');
                }
            }

            if (password == '' || password == ' ' || password == undefined) {
                let updatedClient = await ClientRepository.update(id, {
                    name, birth, cpf: rawCpf, rg, sex, zipCode, address, number, district, complement, state,
                    city, email, status
                });
                phones.forEach(async (phone) => {
                    await PhoneRepository.update(id, { ...phone });
                });
                if (updatedClient[0]) {
                    return res.status(200).json({ message: 'Cliente atualizado com sucesso!' });
                }
                throw new ErrorValidation(202, 'Cliente não existente para ser atualizado!');
            } else {
                bcrypt.hash(password, 10, async (err, hashPassword) => {
                    if (!err) {
                        let updatedClient = await ClientRepository.update(id, {
                            name, birth, cpf: rawCpf, rg, sex, zipCode, address, number, district, complement, state,
                            city, email, password: hashPassword, status
                        });
                        phones.forEach(async (phone) => {
                            await PhoneRepository.update(id, { ...phone });
                        });
                        if (updatedClient[0]) {
                            return res.status(200).json({ message: 'Cliente atualizado com sucesso!' });
                        }
                        throw new ErrorValidation(202, 'Cliente não existente para ser atualizado!');
                    }
                    throw new ErrorValidation(500, 'Um erro aconteceu ao utilizar a base de dados.');
                });
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

    async deleteClient(req, res) {
        try {
            let { id } = req.params;

            let deleted = await ClientRepository.delete(id);
            if (deleted) {
                return res.status(200).json({ message: 'Cliente deletado com sucesso!' })
            }
            throw new ErrorValidation(202, 'Cliente não existente para ser deletado');
        } catch (err) {
            if (err instanceof ErrorValidation) {
                return res.status(err.code).json({ error: err.message });
            } else {
                console.log(err);
                return res.status(500).json({ message: 'Um erro aconteceu ao utilizar a base de dados.' });
            }
        }
    }
}

module.exports = new Client;