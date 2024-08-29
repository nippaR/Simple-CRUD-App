const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Product description is required'],
        default: 0
    },
    image: {
        type: String,
        required: [false, 'Product image is required']
    },
},
{ 
    Timestamps: true,
}
   
);

// // Static method to find product by name
// ProductSchema.statics.findByName = function(name) {
//     return this.findOne({ name });
// };

// Export the model
module.exports = mongoose.model('Product', ProductSchema);























