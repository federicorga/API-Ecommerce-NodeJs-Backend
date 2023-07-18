import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = 'products'




/*title:product.title,
description:product.description,
code:product.code,
price: `$${product.price}`,
status:product.status??true,
stock:product.stock,
category:product.category,
thumbnails:product.thumbnails??[]*/


const productSchema = new mongoose.Schema({ //se genera un ID de forma automatica al crearse este registro. Shcema es esquema
    title: {
        type: String,
        required: true,
        index: true //asi se agrega un indice, se puede verificar en MongosDB index
    },
    description: { type: String },
    code: {
        type: String,
        unique: true, // no pueden haber 2 codigos iguales.
        required: true, // que el campo sea si o si requerido
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
    }
});

productSchema.plugin(mongoosePaginate); //le inyectamos la funcion de paginacion

export const productModel = mongoose.model(productCollection, productSchema);