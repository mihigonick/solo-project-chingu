const {createCustomError} = require("../errors/custom.error")
const Admin = require("../models/admin.model")
const asyncWrapper = require("../middleware/async.wrapper")

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const adminLogin = asyncWrapper(async(req, res, next) => {
    
    const {username, password} = req.body

    if(!username || !password) {
        return next(createCustomError(401, "Username and Password must be provided"))
    }

    const admin = await Admin.findOne({username})
    if(!admin) {
        return next(createCustomError(401, "Incorrect username"))
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
        return next(createCustomError(401, "Incorrect password"))
    }
    
    const id = admin.id
    const token = jwt.sign({username, id}, process.env.JWT_SECRET, {expiresIn: '1h'})
    res.status(200).json({message: "Login successful", token})
})

module.exports = {adminLogin}