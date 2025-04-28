const express = require('express')
const cors = require('cors');
const helmet = require("helmet")
const rateLimiter = require("express-rate-limit")

const adminRoutes = require('./routes/admin.route')
const authRoutes = require('./routes/auth.route')
const publicRoutes = require('./routes/public.routes')

const errorHandler = require('./middleware/error.handler')
const pageNotFound = require("./middleware/not.found")

const app = express()



app.set('trust proxy', 1)

app.use(express.json())

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(cors())
app.use(helmet())



app.use("/api/admin/products", adminRoutes)
app.use("/api/admin", authRoutes)

app.use("/api/products", publicRoutes)

app.use(pageNotFound)

app.use(errorHandler)

module.exports = app