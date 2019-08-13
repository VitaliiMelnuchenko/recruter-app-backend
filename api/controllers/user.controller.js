const { User } = require('../models/index');
const jwt = require('jsonwebtoken');

module.exports = { signin, test };

function signin(req, res, next) {
    User.findOne({ email: req.body.email })
        .then(foundUser => {
            if (foundUser) {
                // give jwt
                const token = jwt.sign(
                    {
                        userId: foundUser._id,
                        email: foundUser.email,
                        name: `${foundUser.firstname} ${foundUser.lastname}`
                    },
                    'superpuperduperkey',
                    {
                        expiresIn: '10h'
                    }
                );
                res.status(200).json({
                    user: foundUser,
                    accessToken: token
                });
            }
            const newUser = {
                firstname: req.body.firstName,
                lastname: req.body.lastName,
                email: req.body.email
            }
            // sign up new user and give jwt
            return User.create(newUser);
        })
        .then(createdUser => {
            const token = jwt.sign(
                {
                    userId: createdUser._id,
                    email: createdUser.email,
                    name: `${createdUser.firstname} ${createdUser.lastname}`
                },
                'superpuperduperkey',
                {
                    expiresIn: '10h'
                }
            );
            res.status(200).json({
                user: createdUser,
                accessToken: token
            });
        })
        .catch(err => {
            next(err);
        });
}

function test() {

}
