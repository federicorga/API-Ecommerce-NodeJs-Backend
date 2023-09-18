import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = 'products'







const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    description: { type: String },
    code: {
        type: String,
        unique: true,
        required: true,
    },
    price: Number,
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        default: 1
    },
    category: String,
    thumbnails: {
        type: Array,
        default: []
    },
    owner: {
        type: String,
        required: true,
        unique: true,
        default: 'admin'
    }
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema);