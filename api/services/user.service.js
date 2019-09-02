const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIEN_ID);

const google_auth = async (google_token) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: google_token,
            audience: process.env.CLIEN_ID
        });
        const { email = '', picture = '' } = ticket.getPayload(); 
        const foundUser = await User.findOne({ email: email });
        if (ticket && foundUser) {
            const token = foundUser.generateAuthToken();
            const { _id, ...userData } = foundUser._doc;
            userData.photoUrl = picture;
            return {
                user: userData,
                accessToken: token
            };
        } else {
            throw new Error('Auth failed');
        }
    } catch(err) {
        throw new Error(err);
    }
}

module.exports = { google_auth }