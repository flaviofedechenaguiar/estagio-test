const JWT = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    try {
        let authToken = req.headers['authorization'];
        let token = authToken.split(' ')[1];
        let data = await JWT.verify(token, '432734217094321980567601098479');
        req.dataClient = data;
        next();
    } catch (err) {
        return res.status(400).json({ message: 'Necessário login para acessar!' });
    }
};