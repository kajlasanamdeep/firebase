const handlers = require('../handlers/User.handler');

async function register(req, res) {

    const data = await handlers.registrationHandler(req);
    res.status(200).send(data);
    
};

async function login(req, res) {

    const data = await handlers.loginHandler(req);
    res.status(200).send(data);

};

async function getProfile(req,res) {

    const data = await handlers.getProfileHandler(req);
    res.status(200).send(data);

};

module.exports = {
    login: login,
    register: register,
    getProfile:getProfile
}