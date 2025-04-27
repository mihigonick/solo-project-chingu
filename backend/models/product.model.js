const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be provided"],
  },
  description: {
    type: String,
    required: [true, "Description must be provided"],
  },
  price: {
    type: Number,
    required: [true, "Price must be provided"],
  },
  image: {
    type: String,
    default: 'images/kenny-store.jpg',
  },
  category: {
    type: String,
    default: 'Other'
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
