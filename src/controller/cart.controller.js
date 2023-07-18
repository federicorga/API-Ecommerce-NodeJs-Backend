

import * as cartService from '../services/cart.service.js'

const getAllCarts = async (req, res) => { //obtengo todos los carritos
    try {
        const result = await cartService.getAllCarts();
        return res.send({ status: 'success', result: result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }

};

const addNewCart = async (req, res) => { // agrego nuevo carrito.
    try {
        const result = await cartService.addNewCart();
        return res.send({ status: 'success', result: `${result}` });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }



};

const getCartByIdWithProduct = async (req, res) => { //obtengo el carrito especificado por id
    try {
        const cartId = req.params.cid;
        const cart = await cartService.getCartByIdWithProduct(cartId); // trae el producto completo

        cart ? res.send(cart) : res.send("Producto no encontrado");
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }


};

const addOneProductInCart = async (req, res) => { //Agrega producto al carrito.
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const result = await cartService.addOneProductInCart(cartId, productId);
        return res.send(result);
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }

};

const modifyQuantityCart = async (req, res) => { //actualiza la cantidad de productos agregados en le carrito.
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity;
        const result = await cartService.modifyQuantityCart(cartId, productId, quantity)

        return res.send(result);
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }

};



const cartClean = async (req, res) => { //limpio el carrito especificado por id (el carrito sigue existiendo)

    try {
        const cartId = req.params.cid;
        const result = await cartService.cartClean(cartId);
        return res.send(result);
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }

};

const updateCart=async(req,res)=>{
    try {
        const cartId=req.params.cid
        const productId =req.body;
        const result = await cartService.updateCart(cartId,productId)
        return res.send(result)
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
  
  }

const deleteProductInCart = async (req, res) => { //elimina un producto del carrito
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        const result = await cartService.deleteProductInCart(cartId, productId);
        return res.send(result);

    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }

};

const closeCart=async(req,res)=>{
    try {
        const cartId=req.params.cid;
        const user = req.user;
        const result = await cartService.closeCart(cartId,user);
        return result;
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
        
    }
}

export {


    getAllCarts,
    addNewCart,
    getCartByIdWithProduct,
    addOneProductInCart,
    modifyQuantityCart,
    cartClean,
    updateCart,
    deleteProductInCart,
    closeCart
}