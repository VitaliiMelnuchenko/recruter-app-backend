const { User } = require('../models');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIEN_ID);

module.exports = { signin };

async function signin(req, res, next) {
    try {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.body.token,
                audience: process.env.CLIEN_ID
            });
        } catch(err) {
            return res.status(401).json({ message: 'Auth failed' });
        }
        const { email = '', picture = '' } = ticket.getPayload(); 
        const foundUser = await User.findOne({ email: email }).select('-__v -isActive').exec();
        if (ticket && foundUser) {
            const token = foundUser.generateAuthToken();
            const { _id, ...userData } = foundUser._doc;
            userData.photo = picture;
            res.status(200).json({
                user: userData,
                accessToken: token
            });
        } else {
            res.status(401).json({ message: 'Auth failed' });
        }
    } catch(err) {
        next(err);
    }
}