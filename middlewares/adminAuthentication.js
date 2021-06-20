const JWT = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    try {
        let authToken = req.headers['authorization'];
        let token = authToken.split(' ')[1];
        let data = await JWT.verify(token, process.env.JWT_SECRET);
        if (data.type == 'admin') {
            req.dataAdmin = data;
            next();
        } else {
            return res.status(400).json({ message: 'Necessário login para acessar!' });
        }
    } catch (err) {
        return res.status(400).json({ message: 'Necessário login para acessar!' });
    }
};