const mongoose = require('mongoose')


const adminSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username must be provided"]
    },
    password: {
        type: String,
        required: [true, "Password must be provided"]
    }
})

const Admin = mongoose.model("Admin", adminSchema)

module.exports = Admin