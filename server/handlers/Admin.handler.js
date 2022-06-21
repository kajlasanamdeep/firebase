const admin = require("firebase-admin/auth");
const app = require("../connection/admin-conn.js");
const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore(app);
const Services = require('../services/EmailService');

async function getUsersHandler(req) {
    try {

        const userRecord = await db.collection("users").doc(req.loggedUser).get();

        if (userRecord.data().role == "admin") {


            const { users } = await admin.getAuth(app).listUsers();

            const unverifiedUsers = users.filter((userRecord) => {
                return !userRecord.emailVerified
            });

            const verifiedUsers = users.filter((userRecord) => {
                return userRecord.emailVerified
            });

            if (req.params.getUsers == "getUnVerifiedUsers")

                return {
                    msg: 'UnVerified users are listed below!',
                    unverified_users: unverifiedUsers
                };

            else if (req.params.getUsers == "getVerifiedUsers")

                return {
                    msg: 'Verified users are listed below!',
                    verified_users: verifiedUsers
                };

        }

        else {

            return {
                msg: "You Are Not Authorized To Access This Page!"
            };

        }

    } catch (error) {

        return {
            msg: 'Error Occur While Listing Users!',
            Error: error
        };

    }

}

async function verifyUserHandler(req) {
    try {

        const userRecord = await db.collection("users").doc(req.loggedUser).get();

        if (userRecord.data().role == "admin") {

            let uid = req.body.uid;

            const userRecord = await admin.getAuth(app).updateUser(uid, {
                emailVerified: true
            });

            const link = await admin.getAuth(app).generatePasswordResetLink(userRecord.email);

            Services.sendUserVerifyMail(userRecord.email, link);

            return {
                msg: "user verified successfully!",
                userRecord: userRecord
            };

        }

        else {

            return {
                msg: "You Are Not Authorized To Access This Page!"
            };

        }

    } catch (error) {

        return {
            msg: "Error Occur While Verifing User!",
            Error: error
        };

    }
}

module.exports = {
    getUsersHandler: getUsersHandler,
    verifyUserHandler: verifyUserHandler
}