import { cartModel } from "../models/carts.model.js";



export default class CartsManager {
  constructor() {
    console.log("Working carts with DB");
  }

  getAllCarts = async () => {
    const carts = await cartModel.find().lean(); //con esto evitamos hacer el map
    return carts;
  };

  getCartById = async (cartId) => { //me trae los id de los productos, peor no el producto completo

    let cart = await cartModel.findOne({ _id: cartId }, { __v: 0 }).lean();

    return cart;

  };

  getCartByIdWithProduct = async (cartId) => { //con este muestro dentro de el carrito los productos completos

    let cart = await cartModel.findOne({ _id: cartId }, { __v: 0 }).lean().populate('products.product'); //uso populate para referenciar el producto completo

    return cart;

  };

  addNewCart = async (cartStruct) => {

    const cart = cartStruct //recibe la estructura del carrito (objeto)

    const result = await cartModel.create(cart);


    return result;

  };

  addOneProductInCart = async (cartId, productId, isInCart) => {
    let result;

    if (isInCart) {
      result = await cartModel.updateOne(
        { _id: cartId, "products.product": productId },
        { $inc: { "products.$.quantity": 1 } });
      return { success: `The product was added successfull in cart`, payload: result };
    } else {
      result = await cartModel.updateOne(
        { _id: cartId },
        { $push: { products: { product: productId, quantity: 1 } } });
      return { success: `The New product was added successfull in cart`, payload: result };
    }
  };


  modifyQuantityCart = async (cartId, productId, quantity) => {
    const cart = cartId;
    const product = productId;
    const quantityProduct = quantity;
    if (!cart) return { error: "Cart not found" };
    if (!product) return { error: "product in cart not found" }

    if (quantityProduct < 1) {
      // Si la nueva cantidad es menor que 1, se establece la cantidad mínima a 1
      const result = await cartModel.updateOne(
        { _id: cart, "products.product": product },
        { $set: { "products.$.quantity": 1 } }
      );
      return { success: "The product quantity was updated to the minimum (1) in the cart", payload: result };
    } else {
      const result = await cartModel.updateOne(
        { _id: cart, "products.product": product },
        { $set: { "products.$.quantity": quantityProduct } }
      );

      return { success: "The product quantity was updated successfully in the cart", payload: result };
    };

  };

  cartClean = async (cartId) => {
    //elimina todos los productos del carrito, pero deja el carrito
    const cart = cartId;

    const result = await cartModel.updateOne(
      { _id: cart },
      { $set: { products: [] } }
    );

    return {
      success: "All products were removed from the cart",
      payload: result,
    };
  };

  async updateCart(cartId, productsId) {
   
      let result = await cartModel.updateOne(
        { _id: cartId },
        { $set: { products: productsId } }
      );
      return { success: `The products were successfully add`, payload: result };
 
  }


  deleteProductInCart = async (cartId, productId) => {
    const cart = cartId
    const existingProduct = productId;
    const result = await cartModel.updateOne(
      { _id: cart },
      { $pull: { products: { product: existingProduct } } }
    );
    return { success: "Product removed from cart", payload: result }

  };

};