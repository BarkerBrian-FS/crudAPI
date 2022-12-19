const express = require('express');
const passport = require('passport')
const passportService = require('../services/passport')

const requireLogin = passport.authenticate('local', {session: false})
const router = express.Router();
const authController = require('../controllers/authentication_controller')


router.post('/', authController.signup)
router.post('/signin', requireLogin, authController.signIn)

module.exports = router;
