var mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName: { type: String, required: true },
    price: { type: String, required: true },
 
  });

const Product= mongoose.model("products", productSchema);

module.exports = { Product };


