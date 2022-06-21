const nodemailer = require("nodemailer");
let EMAIL = process.env.EMAIL;
let PASS = process.env.PASS;

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 500,
    secure: false,
    auth: {
        user: EMAIL,
        pass: PASS
    }
});
module.exports = {
    sendUserVerifyMail: (email,link) => {
        const msg = {
            from: EMAIL,
            to: email,
            subject: 'OTP For verification',
            html: `
            <h6>Welcome To Our Site ${email}</h6>
            <p>Your Email is Verified Successfully! <br>
            Create Password For Your Account To Login By Clicking Below Link
            ${link}
            </p>
            `
        };
        transporter.sendMail(msg, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
};