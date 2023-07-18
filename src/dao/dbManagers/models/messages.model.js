import mongoose from "mongoose";

const messageCollection = 'messages';

const messageSchema = new mongoose.Schema({ //se genera un ID de forma automatica al crearse este registro.

        user: { type: String, require: true },
        fechaActual: { type: String, require: true },
        message: { type: String, require: true },
        socketid: { type: String, require: true },


});

export const messageModel = mongoose.model(messageCollection, messageSchema);