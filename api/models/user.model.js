const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const MIN_LENGTH = 3;

const UserSchema = new Schema({
    firstname: { type: String, min: MIN_LENGTH, required: true },
    lastname: { type: String, min: MIN_LENGTH, required: true },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        index: true
    },
    role: { type: String, enum: ['admin', 'recruiter', 'reviewer', 'candidate'], default: 'candidate', required: true},
    isActive: { type: Boolean, default: false }
}, { versionKey: false });

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