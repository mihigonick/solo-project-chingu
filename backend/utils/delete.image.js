const fs = require('fs')
const path = require('path')

const deleteOldImage = (product) => {
    if (!product.image || product.image === "kenny-store.jpg") return

    const oldImgPath = path.join(process.cwd(), 'public', 'images', product.image)

    fs.unlink(oldImgPath, (err) => {
        if (err) console.error("Error deleting old image:", err.message)
    });
}

module.exports = deleteOldImage