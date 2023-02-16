const mongoose = require('mongoose');
const { Schema } = mongoose
const EmployeeSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        number: {
            type: Number,
            required: true,
            unique: true
        },
        role: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }, { freezeTableName: true }
)
const employee = mongoose.model('Employee', EmployeeSchema);

module.exports = employee
