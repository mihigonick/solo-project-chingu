const Product = require('../models/product.model')
const asyncWrapper = require('../middleware/async.wrapper')
const {createCustomError} = require("../errors/custom.error")

 

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
    const { name, description, price, category } = req.body
    if (!name || !description || !price) {
        return next(createCustomError(400, "name, description, price fields are required"))
    }

    const { file } = req;
    const image = file ? file.path : "https://res.cloudinary.com/dxfw0f3rp/image/upload/v1234567890/kenny-store/kenny-store.jpg";

    const product = await Product.create({ name, description, price, image, category })
    res.json(product)
})




const updateProduct = asyncWrapper(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(createCustomError(404, "Product not found"))
    }

    if (req.file) {
        req.body.image = req.file.path
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
    )

    res.status(200).json({ message: "Product successfully updated", product: updatedProduct })
})




const deleteProduct = asyncWrapper(async(req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id)

    if(!product){
        return next(createCustomError(404, "Product not found"))
    }

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



