const bcrypt = require('bcryptjs');
const Admin = require('../models/admin.model');

const createAdmin = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    await Admin.create({username: "chingu", password: hashedPassword})
    console.log("Admin created")
}

module.exports = createAdmin