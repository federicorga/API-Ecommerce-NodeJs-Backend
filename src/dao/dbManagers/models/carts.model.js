import mongoose from "mongoose";

const cartCollection = 'carts'


const cartSchema = new mongoose.Schema({ //se genera un ID de forma automatica al crearse este registro.

  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ],
    required: true
  }
});

export const cartModel = mongoose.model(cartCollection, cartSchema);