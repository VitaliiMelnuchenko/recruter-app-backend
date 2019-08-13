const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: { type: String, min: 3, max: 50, required: true },
    lastname: { type: String, min: 3, max: 60, required: true },
    email: {
        type: String,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    role: { type: String, enum: ['admin', 'recruiter', 'reviewer', 'candidate'], required: true},
    isActive: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);