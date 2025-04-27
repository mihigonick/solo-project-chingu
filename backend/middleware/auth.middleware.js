const jwt = require('jsonwebtoken')
const { createCustomError } = require('../errors/custom.error')

const authentificationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(createCustomError(401, 'Not authorized route'))
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded; 
    next();
  } catch (err) {
    return next(createCustomError(401, 'Not authorized route'))
  }
}

module.exports = authentificationMiddleware
