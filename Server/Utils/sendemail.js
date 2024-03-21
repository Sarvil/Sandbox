const nodemailer = require("nodemailer");

const mail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD
            }
        });
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text
        });
        console.log("Email Not Sent");
    } catch (error) {
        console.log("Email Not Sent");
        console.log(error);
    }
}

module.exports = mail;