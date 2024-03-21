'use strict'
const User = require("../Models/user-model");
const emailToken = require("../Models/token-model.js");
const bcrypt = require("bcryptjs");
const sendMail = require("../Utils/sendemail");
const crypto = require("crypto");

const verifyLink = ""; 

const home = async (req, res) => {
    try {
        res.status(200).send("Hello World using controllers");
    } catch (error) {
        console.log(error);
    }
};

const register = async (req, res) => {
    try {
        const { username, email, phoneNo, password } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const userCreated = await User.create({ username, email, phoneNo, password });
        res.status(201).json({
            message: "Registration Successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });
        
        const token = await new Token({
            userId: userExist._id,
            token: crypto.randomBytes(32).toString("hex")
        }).save();
        const URL = `${process.env.FRONTEND_URL}/user/${userId}/verify/${token.token}`;
        verifyLink = `/user/${userId}/verify/${token.token}`;
        await sendMail(userExist.email, "Verify Email", URL);
        res.status(201).send({message: "An EMail has been sent to your account. Please Verify"});

    } catch (error) {
        //res.status(500).json("Internal Server Error, because of user creation");
        next(error);
    }
};

const verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id});
        if(!user) return res.status(400).send({message: "Invalid Link"});

        const token = await Token.findOne({
            userId: req.params._id,
            token: req.params.token
        });
        if(!token) return res.status(400).send({message: "Invalid Link"});
        await User.updateOne({i_id: user._id, verified: true}); 
        await token.remove();
        res.status(200).send({message: "Email verified Successfully"});
    } catch (error) {
        console.log(error);
        next(error);
    };
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        console.log(userExist);
        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const user = await userExist.comparePassword(password);

        if(!user.verified){
            let token = await Token.findOne({userId: user._id})
            if(!token){
                const token = await new Token({
                    userId: userExist._id,
                    token: crypto.randomBytes(32).toString("hex")
                }).save();
                const URL = `${process.env.BASE_URL}/user/${userId}/verify/${token.token}`;
                verifyLink = `/user/${userId}/verify/${token.token}`;
                await sendMail(userExist.email, "Verify Email", URL);
            }
            return res.status(400).send({message: "An Email has been sent to you email. please verify"});
        }

        console.log(user);
        if (user) {
            res.status(200).json({
                message: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        } else {
            res.status(401).json({ message: "Invalid Email or Password" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server Error while Login" });
        //next(err);
    }
};

const user = async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ userData });
    } catch (error) {
        console.log('error from the user route ${error}')
    }
}

module.exports = { home, register, login, user, verifyLink, verifyEmail };