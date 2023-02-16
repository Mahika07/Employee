const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const { TokenExpiredError } = require("jsonwebtoken");
const crypto = require('crypto')

const bcrypt = require('bcryptjs')
const dotenv = require("dotenv");
dotenv.config();
const KEY = process.env.KEY
const fetchuser = require('../middleware/fetchuser')
var jwt = require('jsonwebtoken');
exports.signup = (async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "sorry this email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const securepass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securepass
        })

        //generating token

        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, KEY);

        success = true;

        res.json({ success, token })

    }
    catch (error) {
        console.log(error);
        res.status(500).send("some error occured")
    }

})

exports.login = (async (req, res, next) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "please login with correct email or password" });
        }
        const pass = await bcrypt.compare(password, user.password);
        if (!pass) {
            success = false;
            return res.status(400).json({ success, error: "please login with correct email or password" });
        }
        const data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, KEY);
        success = true;
        res.json({ success, token })
    }
    catch (error) {
        console.log(error);
        res.status(500).send("some error occured")
    }
})

exports.userdetails = (async (req, res, next) => {
    try {
        const userid = req.user.id
        console.log(userid)
        const user = await User.findById(userid).select("-password")
        res.send(user)
    }
    catch (error) {
        console.log(error)
        res.status(500).send("some error occured");
    }
})
exports.logout = (async (req, res, next) => {
    res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
    res.status(200).json({ success: true, message: "logout successfully" })
})
