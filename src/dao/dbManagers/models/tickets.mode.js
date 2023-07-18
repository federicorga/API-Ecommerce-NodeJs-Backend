import mongoose from "mongoose";

const ticketCollection = 'tickets';


const ticketSchema = new mongoose.Schema({ //se genera un ID de forma automatica al crearse este registro. Shcema es esquema


    code: {type: String,unique: true,required: true,},
    purchase_datetime: { type: Date, default: Date.now }, //fecha y hora
    amount: { type: Number, require: true }, //total de la compra
    purchaser: {type: mongoose.Schema.Types.ObjectId,ref:'users',required: true,unique: true
    }//correo de usuario

});



export const ticketModel = mongoose.model(ticketCollection, ticketSchema);