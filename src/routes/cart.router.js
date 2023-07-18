import { Router } from 'express';
import{
    getAllCarts,
    addNewCart,
    getCartByIdWithProduct,
    addOneProductInCart,
    modifyQuantityCart,
    cartClean,
    updateCart,
    deleteProductInCart,
    closeCart
    
}from '../controller/cart.controller.js'

import { authorizationRole } from '../middleware/passportSessions.middleware.js';
import { jwtMiddlewareAuthenticate } from '../middleware/passportSessions.middleware.js';
const router = Router();


router.get('/',jwtMiddlewareAuthenticate,authorizationRole(['admin']),getAllCarts); //obtengo todos los carritos
router.post('/',jwtMiddlewareAuthenticate,authorizationRole(['admin','user']),addNewCart); //agrego un nuevo carrito
router.get('/:cid',jwtMiddlewareAuthenticate,authorizationRole(['admin','user']),getCartByIdWithProduct); //obtengo un carrito
router.post('/:cid/product/:pid',jwtMiddlewareAuthenticate,authorizationRole(['user']),addOneProductInCart); //agrego producto en carrito
router.put('/:cid/product/:pid',jwtMiddlewareAuthenticate,authorizationRole(['admin','user']),modifyQuantityCart); //modifico cantidad de producto en carrito
router.delete('/:cid',jwtMiddlewareAuthenticate,authorizationRole(['admin','user']),cartClean); //limpio carrito
router.put("/:cid", jwtMiddlewareAuthenticate,authorizationRole(['admin','user']), updateCart); //modificar carrito
router.delete('/:cid/products/:pid',jwtMiddlewareAuthenticate, authorizationRole(['admin','user']),deleteProductInCart); //elimino producto en carrito
router.get('/:cid/purchase',jwtMiddlewareAuthenticate,authorizationRole(['admin','user']),closeCart) //finalizacion de compra



export default router;

