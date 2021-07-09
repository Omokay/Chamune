const mongoose = require('mongoose');
const {Schema} = mongoose;

const patientSchema = new Schema({
    surname: {
        type: String,
        required: ['true', 'Surname is required'],
        minlength: 4,
        maxlength: 15,
    },
    firstname: {
        type: String,
        required: [true, 'Surname is required'],
        minlength: 4,
        maxlength: 15,
    },
    age: {
        type: "Number",
        required: [true, 'Age is required']
    },
    immunizations: {
        type: Array,
        min: 0,
    }
});


module.exports = mongoose.model('Patients', patientSchema);
