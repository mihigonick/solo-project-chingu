const express = require('express')
const cors = require('cors');

const adminRoutes = require('./routes/admin.route')
const authRoutes = require('./routes/auth.route')
const publicRoutes = require('./routes/public.routes')

const errorHandler = require('./middleware/error.handler')
const pageNotFound = require("./middleware/not.found")

const app = express()

//REMOVE
app.use(cors())
app.use(express.json())

app.use('/images', express.static('public/images'))

app.use("/api/admin/products", adminRoutes)
app.use("/api/admin", authRoutes)

app.use("/api/products", publicRoutes)

app.use(pageNotFound)

app.use(errorHandler)

module.exports = app