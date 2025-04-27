const express = require('express')
const upload = require('../middleware/upload.image')
const authMiddleware = require('../middleware/auth.middleware')


const {
    getAllProducts, 
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    clearAllProducts
} = require("../controllers/admin.controller")


const router = express.Router()

router.use(authMiddleware)

router.route("/")
    .get(getAllProducts)
    .post(upload.single('image'), createProduct)

router.route("/:id")
    .get(getProduct)
    .patch(upload.single('image'), updateProduct)
    .delete(deleteProduct)

router.route("/clear")
    .post(clearAllProducts)

module.exports = router