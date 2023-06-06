import { cartModel } from "../models/carts.model.js";
import ProductManager from "./products.manager.js";

const productManager = new ProductManager();
export default class CartsManagerDB {
  constructor() {
    console.log("Working carts with DB");
  }

  getCarts = async () => {
    const carts = await cartModel.find().lean(); //con esto evitamos hacer el map
    return carts;
  };

  getCartById = async (cartId) => { //me trae los id de los productos, peor no el producto completo
    try {
      let cart = await cartModel.findOne({ _id: cartId }, { __v: 0 }).lean();

      if (!cart) throw new Error("the cart not exist.");

      return cart;
    } catch (error) {
      return { error: error.message };
    }
  };

  getCartByIdWithProduct = async (cartId) => { //con este muestro dentro de el carrito los productos completos
    try {
      let cart = await cartModel.findOne({ _id: cartId }, { __v: 0 }).lean().populate('products.product'); //uso populate para referenciar el producto completo

      if (!cart) throw new Error("the cart not exist.");

      return cart;
    } catch (error) {
      return { error: error.message };
    }
  };

  addNewCart = async () => {
    try {
      const cart = {
        products: [],
      };

      const result = await cartModel.create(cart);
      console.log("Carrito generado");
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  addProductInCart=async(cartId,productId)=>{

        
    const cart=await this.getCartById(cartId);
    const product= await productManager.getProductById(productId);
    
    if(cart && product){ 
        
    let isInCart=cart.products.find((item)=>item.product._id.toString()===productId);
    
    let result;
    if(isInCart){
           result = await cartModel.updateOne(
            {_id: cartId, "products.product":productId},
            {$inc:{"products.$.quantity":1}}
           )
        }else{
            result = await cartModel.updateOne(
                {_id: cartId},
                {$push:{products:{product:productId,quantity:1}}}
            )
        }
        return {success:`The product was added successfull in cart`,
        payload: result};
    };
};

modifyQuantityCart= async (cartId, productId, quantity=1) => {
    const cart = await this.getCartById(cartId);
    const existingProduct = cart.products.find((item) => item.product._id.toString() === productId);
    const Quantity = quantity;
    if (!cart) return { error: "Cart not found" };
    if (!existingProduct) return { error: "product in cart not found" }

    if (Quantity < 1) {
        // Si la nueva cantidad es menor que 1, se establece la cantidad mínima a 1
        const result = await cartModel.updateOne(
          { _id: cartId, "products.product": productId },
          { $set: { "products.$.quantity": 1 } }
        );

        return {success:"The product quantity was updated to the minimum (1) in the cart", payload: result};
      } else {
        const result = await cartModel.updateOne(
          { _id: cartId, "products.product": productId },
          { $set: { "products.$.quantity": Quantity } }
        );

        return {success: "The product quantity was updated successfully in the cart",payload: result};
      };
    
  };

  cartClean = async (cartId) => {
    //elimina todos los productos del carrito, pero deja el carrito
    const cart = await this.getCartById(cartId);

    if (!cart) {
      return { error: "Cart not found" };
    }

    cart.products = []; // Vaciar la lista de productos del carrito

    const result = await cartModel.updateOne(
      { _id: cartId },
      { $set: { products: cart.products } }
    );

    return {
      success: "All products were removed from the cart",
      payload: result,
    };
  };

  deleteProductInCart = async (cartId, productId) => {
    const cart = await this.getCartById(cartId);
    const existingProduct = cart.products.find((item) => item.product === productId);
    if (!cart) return { error: "Cart not found" };
    if (!existingProduct) return { error: "product in cart not found" }
    const result = await cartModel.updateOne(
      { _id: cartId },
      { $pull: { products: { product: productId } } }
    );
      return {success: "Product removed from cart", payload:result}
    
  };
}
