const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIEN_ID);
const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { RECRUITER, REVIEWER } = require('../CONSTANTS');

const errorHandler = require('../../utils/errorHandler');
const err400 = errorHandler.serverError();
const err401 = errorHandler.unauthorized('Auth failed');
const err500 = errorHandler.serverError();

const { invitationCandidateMail, invitationMail } = require('../CONSTANTS');

const createUser = async data => {
    try {
        const user = await User.create(data);
        return user;
    } catch (err) {
        throw err;
    }
};

const findUser = async data => {
    try {
        const user = await User.findOne(data);
        return user;
    } catch (err) {
        throw err400;
    }
};

const updateUser = async (id, data) => {
    try {
        const updateduser = await User.findByIdAndUpdate(id, data, {
            new: true
        });
        if (updateUser) {
            return updateduser;
        } else {
            throw err400;
        }
    } catch (err) {
        throw err;
    }
};

const deleteUser = async id => {
    try {
        const deleteduser = await User.findByIdAndDelete(id);
        if (deleteduser) {
            return deleteduser;
        } else {
            throw err400;
        }
    } catch (err) {
        throw err;
    }
};

const findUsersByRole = async roles => {
    try {
        if (!Array.isArray(roles)) throw err400;
        const users = await User.find({ role: { $in: roles } });
        return users;
    } catch (err) {
        throw err;
    }
};

const google_auth = async google_token => {
    try {
        const ticket = await client
            .verifyIdToken({
                idToken: google_token,
                audience: process.env.CLIENT_ID
            })
            .catch(() => {
                throw err401;
            });
        const { email = '', picture = '' } = ticket.getPayload();
        const foundUser = await User.findOne({ email: email });
        if (ticket && foundUser && foundUser.isActive) {
            const token = foundUser.generateAuthToken(picture);
            const { _id, ...userData } = foundUser._doc;
            userData.photoUrl = picture;
            return {
                user: userData,
                accessToken: token
            };
        } else {
            throw err401;
        }
    } catch (err) {
        throw err;
    }
};

const sendInvite = async (role, email, code, vacancy = '') => {
    try {
        const transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.COMPANY_EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const mailOptions =
            role === REVIEWER || role === RECRUITER
                ? invitationMail(email, code)
                : invitationCandidateMail(email, code, vacancy);
        const sendEmail = await transporter.sendMail(mailOptions);
    } catch (err) {
        throw err;
    }
};

const activateUser = async code => {
    try {
        const userId = jwt.verify(code, process.env.JWT_SECRET_KEY);
        const user = await User.findByIdAndUpdate(
            userId._id,
            { $set: { isActive: true } },
            { new: true }
        );
        if (user && user.isActive) {
            return { success: true };
        }
        throw err500;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createUser,
    findUser,
    google_auth,
    sendInvite,
    activateUser,
    findUsersByRole,
    updateUser,
    deleteUser
};
