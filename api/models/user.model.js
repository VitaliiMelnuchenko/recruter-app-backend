const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const UserSchema = new Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: {
            type: String,
            required: true,
            match: /.+\@.+\..+/,
            index: true
        },
        role: {
            type: String,
            enum: ['admin', 'recruiter', 'reviewer', 'candidate'],
            default: 'candidate',
            required: true
        },
        isActive: { type: Boolean, default: false }
    },
    { versionKey: false }
);

UserSchema.methods.generateAuthToken = function(photo) {
    try {
        const token = jwt.sign(
            {
                _id: this._id,
                role: this.role,
                isActive: this.isActive,
                photoUrl: photo
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '10h'
            }
        );
        return token;
    } catch (err) {
        throw new Error(err);
    }
};

UserSchema.methods.generateVerificationCode = function() {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '7d'
        });
        return token;
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = mongoose.model('User', UserSchema);
