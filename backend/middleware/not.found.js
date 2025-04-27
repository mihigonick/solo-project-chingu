const routeNotfound = (req, res, next) => {
    res.status(404).send({ error: "Route Not Found" })
}
  
module.exports = routeNotfound