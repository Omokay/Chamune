const Hospital = require('../models/hospitalSchema');
const Authentication = require('../authentication/authentication');

class HospitalController {
    static async CreateHospital(req, res) {
        const userExists = Hospital.findOne({email: req.body.email});
        userExists.then((email) => {
            if (email) {
                res.status(409).send({
                    status: 409,
                    message: 'This email already exists',
                });
            }
        }).catch(err => res.send({
            message:  err.message
        }));

        if (!userExists) {
            return;
        }

        const {name, username, email, password, location} = req.body;
        const hashedPassword = Authentication.hashPassword(password);
        const token = Authentication.generateToken({
            name,
            email,
        });

        const user = new Hospital(req.body);
        user.save().then((data) => {
            res.status(201).send({
                name,
                username,
                email,
                hashedPassword,
                location,
            });
        }).catch(err => {
            res.status(500).send(err.message || 'Some error occured while creating a user');
        })
    }
}
module.exports = HospitalController;
