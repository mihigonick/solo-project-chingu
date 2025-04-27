const Product = require('../models/product.model')
const asyncWrapper = require('../middleware/async.wrapper')
const {createCustomError} = require("../errors/custom.error")
const deleteOldImage = require("../utils/delete.image")
 

const getAllProducts = asyncWrapper(async(req, res, next) => {
    const allProducts = await Product.find({})
    res.status(200).json(allProducts)
})



const getProduct = asyncWrapper(async(req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product){
        return next(createCustomError(404, "Product not found"))
    }
    res.json(product)
})



const createProduct = asyncWrapper(async (req, res, next) => {
    const {name, description, price, category} = req.body
    if (!name || !description || !price){
        return next(createCustomError(400, "name, description, price fields are required"))
    }
    const {file} = req
    const image = file? file.filename : "kenny-store.jpg"
    const product = await Product.create({name, description, price, image, category})
    res.json(product)
})



const updateProduct = asyncWrapper(async(req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (req.file){
        req.body.image = req.file.filename
        deleteOldImage(product)
    }

    await Product.findByIdAndUpdate(req.params.id, {$set: req.body}, {
        new: true,
        runValidators: true
    })

    res.send("Product successfully updated")
})



const deleteProduct = asyncWrapper(async(req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id)

    if(!product){
        return next(createCustomError(404, "Product not found"))
    }

    deleteOldImage(product)
    res.status(200).json({ message: `${product.name} deleted successfully`})
})


const clearAllProducts = asyncWrapper(async (req, res, next) => {
    await Product.deleteMany({})
    res.status(200).json({ message: "All products have been deleted" })
});



module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    clearAllProducts
}



