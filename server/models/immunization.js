const mongoose = require('mongoose');
const {Schema} = mongoose;

const immunizationSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name cannot cannot be empty'],
        minlength: 6,
        maxlength: 100,
    },
    description: {
        type: String,
        minlength: 6,
        trim: true,
        maxlength: 200,
    },
    immunizationCode: {
        type: "Number",
        unique: true,
        trim: true,
        required: [true, 'Code cannot empty'],
    }
});

module.exports = mongoose.model('ImmunizationCode', immunizationSchema);
