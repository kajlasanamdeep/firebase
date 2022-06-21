const app = require("../connection/user-conn.js");
const firebaseAuth = require('firebase/auth');
const firestore = require('firebase/firestore');
const db = firestore.getFirestore(app);
const auth = firebaseAuth.getAuth(app);


async function registrationHandler(req) {
    try {
        
        const { email } = req.body;
        const password = Math.floor(Math.random() * 100000) + 654321;
        const { user } = await firebaseAuth.createUserWithEmailAndPassword(auth, email, password);
        const accessToken = await user.getIdToken(true);
        const doc = firestore.doc(db, "users", user.uid);

        req.body.role = "user";
        await firestore.setDoc(doc, req.body);

        return {
            msg: "User Registered Successfully!",
            accessToken: accessToken
        };

    } catch (error) {

        return {
            msg: "Registration Error!",
            registerError: error
        };

    }
}

async function loginHandler(req) {
    try {

        const { email, password } = req.body;

        const { user } = await firebaseAuth.signInWithEmailAndPassword(auth, email, password);

        if (!user.emailVerified) return { msg: 'User Not Allowded To Login!' };

        const accessToken = await user.getIdToken(true);

        return {
            msg: 'User Logged In SucccessFully!',
            accessToken: accessToken
        };

    } catch (error) {

        return {
            msg: "Login Error!",
            loginError: error
        };

    }
}

async function getProfileHandler(req) {
    try {

        const doc = firestore.doc(db, "users", req.loggedUser);
        const userRecord = await firestore.getDoc(doc);

        return {
            msg: "User Profile Loaded SuccessFully!",
            userProfile: userRecord.data()
        };

    }
    catch (error) {

        return {
            msg: "Error While Loading User Profile!",
            Error: error
        };

    }
}

module.exports = {
    registrationHandler: registrationHandler,
    loginHandler: loginHandler,
    getProfileHandler: getProfileHandler
}