const { getAuth } = require("firebase-admin/auth");
const app = require("../connection/admin-conn.js");

module.exports = async (req, res, next) => {
    if (req.headers.authorization) {

        let accessToken = req.headers.authorization;

        if (accessToken.startsWith('Bearer')) {
            [, accessToken] = accessToken.split(' ');
        }
        try {
            let decodedData = await getAuth(app).verifyIdToken
            (accessToken);
            if(decodedData.email_verified){
            req.loggedUser = decodedData.uid;
            next();
            }
            else{
                res.status(400).send({ msg: "you are verified yet!" });
            }
        }
        catch (error) {
            res.status(400).send({ msg: "Login Session Expired Plz login Again!" })
        }
    }
    else {
        res.status(400).send({ msg: "UnAuthorized Access!" })
    }
}