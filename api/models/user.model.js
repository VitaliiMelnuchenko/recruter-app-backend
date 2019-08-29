const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    firstname: { type: String, min: 3, max: 50, required: true },
    lastname: { type: String, min: 3, max: 60, required: true },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        index: true
    },
    role: { type: String, enum: ['admin', 'recruiter', 'reviewer', 'candidate'], default: 'candidate', required: true},
    isActive: { type: Boolean, default: false }
});

UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        {
            _id: this._id,
            role: this.role
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: '10h'
        }
    );
    return token;
};

module.exports = mongoose.model('User', UserSchema);