import mongoose from "mongoose";

const cartCollection= 'carts'


const cartSchema =new mongoose.Schema({ //se genera un ID de forma automatica al crearse este registro.
    
    products:{
        type:Array,
        require:true
       }

    
});

export const cartModel=mongoose.model(cartCollection,cartSchema);