const router = require('express').Router();
const controller = require('../controllers');
const isUserAuthorized = require('../auth/userAuthorization');

router.post('/register', controller.User.register);
router.post('/login', controller.User.login);
router.get('/viewProfile',isUserAuthorized,controller.User.getProfile);

module.exports = router;