import CartRepository from '../repositories/cart.repository.js';
import ProductRepository from '../repositories/products.repository.js'
import { createTicket } from './tickets.service.js';
import {logger} from '../loggers/logger.js';
const cartRepository= new CartRepository();
const productRepository =new ProductRepository();


const getAllCarts = async () => {
const carts = await cartRepository.getAllCarts();

return carts;
};

const getCartById = async (cartId) => {
    const cart= await cartRepository.getCartById(cartId);
    if (!cart) throw new Error("the cart not exist.");
    return cart;

};

const getCartByIdWithProduct = async (cartId) => {
 const cart = await cartRepository.getCartByIdWithProduct(cartId);
 if (!cart) throw new Error("the cart not exist.");
 return cart;
};

const addNewCart = async () => {
    const cart = await cartRepository.addNewCart();
    return cart;

};

const addOneProductInCart = async (cartId, productId) => {
    const cart=await cartRepository.getCartById(cartId);
    const product= await productRepository.getProductById(productId);

    if(!cart)return { error: "Cart not found" };
    if(!product)return { error: "product not found" };
    const isInCart= cart.products.find((item)=>item.product._id.toString()===productId);
    const result = await cartRepository.addOneProductInCart(cart,product,isInCart);
    return result;
};

const modifyQuantityCart = async (cartId, productId, quantity=1) => {
 const cart = await cartRepository.getCartById(cartId);
 const existingProduct = cart.products.find((item) => item.product._id.toString() === productId);
 const quantityProduct = quantity;
const result = await cartRepository.modifyQuantityCart(cart,existingProduct,quantityProduct);
return result;

};

const cartClean = async (cartId) => {
    const cart=cartId;
    if (!cart) return { error: "Cart not found" };
    
    const result = await cartRepository.cartClean(cart);
    return result;
};

const updateCart=async(cartId,productId)=>{
  const result = await cartRepository.updateCart(cartId,productId)
  return result
}

const deleteProductInCart = async (cartId, productId) => {
    const cart = await cartRepository.getCartById(cartId); //existe el carrito
    const existingProduct = cart.products.find((item) => item.product.toString() === productId); //existe el producto en el carrito
    logger.warning(existingProduct);
    if (!cart) return { error: "Cart not found" };
    if (!existingProduct) return { error: "product in cart not found" }
    const result = await cartRepository.deleteProductInCart(cart,existingProduct);
    return result;

}

const closeCart = async (cartId,user) => {
    const { cid } = cartId;
   
    let cart = await cartRepository.getCartById(cid);
  
    if (cart.products.length > 0) {
      let amount = 0;
      let productWithoutStock = [];
      let purchaser = user.email; //usuario email
  
      cart.products.forEach(async ({ product, quantity }) => {
        if (product.stock >= quantity) {
          amount += product.price * quantity;
          product.stock -= quantity;
          await productRepository.updateOneProduct(product._id, product); //actualizo el producto
        } else {
          productWithoutStock.push({ product, quantity }); //devuelvo los productos que sean mayor que el stock disponible
        }
      });
  
      if (amount > 0) {
        const result = await createTicket({ amount, purchaser });
        if (result?.error) {
          return result;
        } else {
          let payload = await cartRepository.updateCart(cid, productWithoutStock); //retorna el producto que no tiene stock
          return payload;
        }
      } else {
        return{error: "No products available." };
      }
    } else {
      return { error: "There are not products in the cart." };
    }
  };
  


export {
    getAllCarts,
    getCartById,
    getCartByIdWithProduct,
    addNewCart,
    addOneProductInCart,
    modifyQuantityCart,
    cartClean,
    updateCart,
    deleteProductInCart,
    closeCart
 
}