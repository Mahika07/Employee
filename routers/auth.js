const express = require('express');
const { signup, login, userdetails, logout } = require('../controllers/usercontroller')
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post("/signup", [body('name', 'Enter a valid name').isLength({ min: 3 }), body('email', 'Enter a valid email').isEmail(), body('password', 'password should be of minimum length 5').isLength({ min: 5 })], signup)
router.post("/login", login)
router.get("/logout", logout)
router.post("/userdetails", userdetails)
module.exports = router