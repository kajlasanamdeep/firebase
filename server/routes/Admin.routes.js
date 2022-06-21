const router = require('express').Router();
const controller = require('../controllers');
const isAdminAuthorized = require('../auth/userAuthorization');

router.get('/:getUsers',isAdminAuthorized,controller.Admin.getUsers);
router.post('/verifyUser',isAdminAuthorized,controller.Admin.verifyUser);

module.exports = router;