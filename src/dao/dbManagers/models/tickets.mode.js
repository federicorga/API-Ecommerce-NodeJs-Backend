import mongoose from "mongoose";

const ticketCollection = 'tickets';


const ticketSchema = new mongoose.Schema({


    code: { type: String, required: true, },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, require: true },
    purchaser: {
        type: mongoose.Schema.Types.String, ref: 'users', required: true, unique: false
    }

});



export const ticketModel = mongoose.model(ticketCollection, ticketSchema);