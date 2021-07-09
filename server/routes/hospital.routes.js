const express = require('express');
const router = express.Router();
const HospitalController = require('../controllers/hospital.controller');
const { body, validationResult } = require('express-validator');


const {CreateHospital} = HospitalController;

router.post('/register', CreateHospital);

router.post('/signin', function(req, res, next) {

});

module.exports = router;
