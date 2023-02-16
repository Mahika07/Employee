const express = require('express');
const router = express.Router();
const fecthuser = require('../middleware/fetchuser')
const Employee = require('../models/Employee')
const { body, validationResult } = require('express-validator');



//fecth all employee 
exports.getAllEmployee = (async (req, res) => {
    try {
        const employee = await Employee.find();
        res.json(employee)
    }
    catch (error) {
        console.log(error)
        res.status(500).send("some error occured")
    }

})

//add employee
exports.add = (async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, number, role, date } = req.body;
    try {

        const employee = new Employee({
            name, email, number, role, date
        })

        const added = await employee.save();

        res.send(added)



    }
    catch (error) {
        console.log(error)
        res.status(500).send("some error occured")
    }

})

//update
exports.update = (async (req, res) => {
    const { number, role } = req.body
    const employee = {}

    try {
        if (number) { employee.number = number }
        if (role) { employee.role = role }


        let e = await Employee.findById(req.params.id);
        if (!e) {
            return res.status(400).send("not found")
        }

        e = await Employee.findByIdAndUpdate(req.params.id, { $set: employee }, { new: true })
        res.json(e)
    }
    catch (error) {
        console.log(error)
        res.status(500).send("some error occured")
    }

})

//delete 
exports.deleteEmployee = (async (req, res) => {
    try {
        let employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(400).send("not found")
        }

        employee = await Employee.findByIdAndDelete(req.params.id);
        res.json({ successs: "employee deleted" })
    }
    catch (error) {
        console.log(error)
        res.status(500).send("some error occured")
    }


})
