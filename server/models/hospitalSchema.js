const mongoose = require('mongoose');
const {Schema} = mongoose;

const hospitalSchema = new Schema({
    name: {
        type: String,
        minlength: 4,
        maxlength: 70,
        trim: true,
        required: [true, "Please enter the name of institution"],
    },
    username: {
        type: String,
        minlength: 6,
        maxlength: 15,
        trim: true,
        unique: true,
        required: [true, "Username cannot be empty"],
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 20,
        required: [true, "Password cannot be empty"],
    },
    email: {
        type: String,
        required: [true, "Email cannot be empty"],
        trim: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        unique: true,
        lowercase: true,
    },
    location: {
        type: String,
        minlength: 8,
        maxlength: 50,
    },
    createdOn: {
        type: { Date, default: Date.now}
    }
});


module.exports = mongoose.model('Hospital', hospitalSchema);
