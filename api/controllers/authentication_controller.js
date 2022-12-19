const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

const tokenForUser = (user) => {
    const timeStamp = new Date().getTime()
    return jwt.encode({
        sub: user.id,
        iat: timeStamp
    }, config.secret)
}

exports.signIn = (req, res, next) => {
    const user = req.user;
    res.send({token: tokenForUser(user), user_id: user._id})
}

exports.signup = (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    if(!email || !password ){
        return res.status(422).json({error: 'Please provide email and password'})
    }
    User.findOne({email: email},(err, exsistingUser) => {
        if(err){return next(error)}
        if(exsistingUser){return res.status(422).json({error: 'Email in use'})}

        const user = new User({
            email: email,
            password: password
        })
        User.save((error) => {
            if(error){return next (error)}
            res.json({user_id: user_id, token: tokenForUser(user)})
        })
    })
}