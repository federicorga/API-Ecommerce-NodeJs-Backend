import { CARTDAO } from "../dao/configDao.js";



const getCarts = async () => {
const carts = await CARTDAO.getAllCarts();
return carts;
};

const getCartId = async (cartId) => {
    const cart= await CARTDAO.getCartById(cartId);
    return cart;

};

const getCartdWithProduct = async (cartId) => {
 const cart = await CARTDAO.getCartByIdWithProduct(cartId);
 return cart;
};

const addCart = async () => {

    const cart = await CARTDAO.addNewCart();
    return cart;

};

const addOProductInCart = async (cartId, productId) => {
const result = await CARTDAO.addOneProductInCart(cartId,productId);
return result;

};

const QuantityProductCart = async (cartId, productId, quantity) => {

const result = await CARTDAO.modifyQuantityCart(cartId,productId,quantity);
return result;

};

const cleanCart = async (cartId) => {
    const result = await CARTDAO.cartClean(cartId);
    return result;
};

const deleteProductCart = async (cartId, productId) => {
    const result = await CARTDAO.deleteProductInCart(cartId,productId);
    return result;

}

export {
    getCarts,
    getCartId,
    getCartdWithProduct,
    addCart,
    addOProductInCart,
    QuantityProductCart,
    cleanCart,
    deleteProductCart,
}