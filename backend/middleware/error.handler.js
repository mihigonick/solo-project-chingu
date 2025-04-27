const { CustomError } = require("../errors/custom.error")

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError){
        return res.status(err.statusCode).send({error: err.message})
    }
    res.status(500).send({error: err.message || "Something went wrong"})
}

module.exports = errorHandler