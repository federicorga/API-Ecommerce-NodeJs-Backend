import mongoose from "mongoose";


const productCollection= 'products'




/*title:product.title,
description:product.description,
code:product.code,
price: `$${product.price}`,
status:product.status??true,
stock:product.stock,
category:product.category,
thumbnails:product.thumbnails??[]*/


const productSchema =new mongoose.Schema({ //se genera un ID de forma automatica al crearse este registro.
    title: {type:String,
    required:true},
    description: {type:String},
    code: {
        type:String,
        unique: true, // no pueden haber 2 codigos iguales.
        required:true, // que el campo sea si o si requerido
    },
    price:Number,
    status:{
        type:Boolean,
        default:true
    },
    stock:{type:Number,
    default:1},
    category:String,
    thumbnails:{type:Array,
    default:[]}
});

export const productModel=mongoose.model(productCollection,productSchema);