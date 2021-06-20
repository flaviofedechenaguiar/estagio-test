const JWT = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    try {
        let authToken = req.headers['authorization'];
        let token = authToken.split(' ')[1];
        let data = await JWT.verify(token, process.env.JWT_SECRET);
        if (data.type == 'client') {
            req.dataClient = data;
            let { id } = req.params;
            if (id != undefined) {
                if (id == data.id) {
                    return next();
                }
                return res.status(400).json({ message: 'Solicitação incompatível com as informações recebidas!' });
            }
            return next();
        } else {
            return res.status(400).json({ message: 'Necessário login para acessar!' });
        }
    } catch (err) {
        return res.status(400).json({ message: 'Necessário login para acessar!' });
    }
};