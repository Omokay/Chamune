const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const {secretKey} = process.env;

class Authentication {
    static checkPassword(inputPassword, savedPassword) {
        return bcrypt.compareSync(inputPassword, savedPassword);
    }

    static generateToken(payload) {
        return jsonwebtoken.sign({ payload }, secretKey, {
            expiresIn:'8hrs'
        });
    }

    static verifyToken(token) {
        return jsonwebtoken.verify(token, secretKey, {
            expiresIn:'24d'
        });
    }

    static hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }
}


module.exports = Authentication;
