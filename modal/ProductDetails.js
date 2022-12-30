var mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId;
const productDetailSchema = mongoose.Schema({
    product_id: {
        type: ObjectId,
        ref:'Product',
    },
    product_cost: {
        type: String,
    },
    feedback: {
        type: String,
    }
}, { timeStamp: true, versionKey: false });

exports.ProductDetails = mongoose.model('product_details', productDetailSchema);