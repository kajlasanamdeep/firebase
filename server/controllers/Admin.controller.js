const handlers = require('../handlers/Admin.handler');

async function getUsers(req,res) {

    const data = await handlers.getUsersHandler(req);
    res.status(200).send(data);

}

async function verifyUser(req,res) {

    const data = await handlers.verifyUserHandler(req);
    res.status(200).send(data);

}

module.exports = {
    verifyUser:verifyUser,
    getUsers:getUsers
}