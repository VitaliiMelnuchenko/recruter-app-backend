const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIEN_ID);
const nodeMailer = require('nodemailer');
const vacancyService = require('./vacancy.service');
const applicationService = require('./application.service');
const jwt = require('jsonwebtoken');
const errorHandler = require('../../utils/errorHandler');
const err400 = errorHandler.serverError();
const err401 = errorHandler.unauthorized('Auth failed');
const err500 = errorHandler.serverError();

const createUser = async data => {
    try {
        const user = await User.create(data);
        return user; 
    } catch(err) {
        throw err;
    }
};

const fingUser = async data => {
    try {
        const user = await User.findOne(data);
        return user;
    } catch(err) {
        throw err400;
    }
}

const google_auth = async (google_token) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: google_token,
            audience: process.env.CLIENT_ID
        }).catch(() => { throw err401 });
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
    } catch(err) {
        throw err;
    }
};

const sendVerificationCode = async (email, code, vacancy) => {
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
        const mailOptions = {
            from: 'TechMagic',
            to: email,
            subject: `You are invited on position ${vacancy}`,
            html: `
                <h1>Hello!</h1>
                <h2 style="color: dodgerblue">Follow the link bellow to begin test:</h2>
                <a href="http://recruiter-dev.surge.sh/${code}">http://recruiter-dev.surge.sh/${code}</a>
                <br>
                <br>
                <a href="http://localhost:4200/${code}">http://localhost:4200/${code}</a>
                <br>
                <br>
                <h3>
                    Thanks!
                </h3>
                <h4>The screaming tool team</h4>
            `
        };
        const sendEmail = await transporter.sendMail(mailOptions);
    } catch(err) {
        throw err;
    }
};

const inviteCandidate = async (candidateData, vacancyId) => {
    try {
        let candidate = await fingUser(candidateData);
        if (!candidate) {
            candidate = await createUser(candidateData);
        }
        const appData = {
            candidate: candidate._id,
            vacancy: vacancyId
        };
        const application = await applicationService.createOne(appData);
        const vacancy = await vacancyService.getOne(vacancyId);
        const code = candidate.generateVerificationCode();
        const email = await sendVerificationCode(candidate.email, code, vacancy.title);
    } catch(err) {
        throw err;
    }
};

const activateUser = async (code) => {
    try {
        const userId = jwt.verify(code, process.env.JWT_SECRET_KEY);
        const user = await User.findByIdAndUpdate(userId._id, { $set: { isActive: true } }, { new: true });
        if (user && user.isActive) {
            return { success: true }
        }
        throw err500;
    } catch(err) {
        throw new Error(err);
    }
};

module.exports = { google_auth, inviteCandidate, activateUser };