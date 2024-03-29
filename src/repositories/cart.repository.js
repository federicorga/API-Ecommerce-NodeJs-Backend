import { CartDAO } from "../dao/factory.js";
import {logger} from "../loggers/logger.js";

export default class CartRepository {
    constructor() { 
        this.dao = CartDAO;
    }

    getAllCarts = async () => {
        const carts = await this.dao.getAllCarts();
        return carts;
    };

    getCartById = async (cartId) => {
        const cart = await this.dao.getCartById(cartId);
        return cart;

    };

    getCartByIdWithProduct = async (cartId) => {
        const cart = await this.dao.getCartByIdWithProduct(cartId);
       
        return cart;
    };

    addNewCart = async () => {
        const cartStruct = { 
            products: [],
          };
        const newCart = await this.dao.addNewCart(cartStruct);
        if (newCart)logger.info("Carrito generado");
        return newCart;

    };

    addOneProductInCart = async (cartId, productId,isInCart) => {
        const result = await this.dao.addOneProductInCart(cartId, productId,isInCart);
        return result;

    };

    modifyQuantityCart = async (cartId, productId, quantity) => {

        const result = await this.dao.modifyQuantityCart(cartId, productId, quantity);
        return result;

    };

    cartClean = async (cartId) => {
        const result = await this.dao.cartClean(cartId);
        return result;
    };

    updateCart=async(cartId,productId)=>{
        const result = await this.dao.updateCart(cartId,productId)
        return result
    }

    deleteProductInCart = async (cartId, productId) => {
        const result = await this.dao.deleteProductInCart(cartId, productId);
        return result;

    }



}