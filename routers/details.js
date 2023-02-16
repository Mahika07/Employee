const express = require('express');
const { getAllEmployee, add, update, deleteEmployee } = require('../controllers/employeecontroller')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

router.get("/getallemployee", fetchuser, getAllEmployee);
router.post("/addemployee", fetchuser, [body('name', 'minimum 3 length').isLength({ min: 3 }), body('email', 'Enter a valid email').isEmail(), body('role', 'minimum 3 length').isLength({ min: 3 })], add)
router.put("/updateemployee", fetchuser, [body('role', 'minimum 3 length').isLength({ min: 3 })], update)
router.delete("/deleteemployee", fetchuser, deleteEmployee)





module.exports = router;