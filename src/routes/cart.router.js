import { Router } from 'express';
import {
    getAllCarts,
    addNewCart,
    getCartByIdWithProduct,
    addOneProductInCart,
    modifyQuantityCart,
    cartClean,
    updateCart,
    deleteProductInCart,
    closeCart

} from '../controller/cart.controller.js'

import { authorizationRole } from '../middlewares/passportSessions.middleware.js';
import { jwtMiddlewareAuthenticate } from '../middlewares/passportSessions.middleware.js';
import { routingError } from '../middlewares/errors/routingError.middleware.js';
const router = Router();


router.get('/', jwtMiddlewareAuthenticate, authorizationRole(['admin']), getAllCarts); //obtengo todos los carritos
router.post('/', jwtMiddlewareAuthenticate, authorizationRole(['admin', 'user']), addNewCart); //agrego un nuevo carrito
router.get('/:cid', jwtMiddlewareAuthenticate, authorizationRole(['admin', 'user']), getCartByIdWithProduct); //obtengo un carrito
router.delete('/:cid', jwtMiddlewareAuthenticate, authorizationRole(['admin', 'user']), cartClean); //limpio carrito
router.put('/:cid', jwtMiddlewareAuthenticate, authorizationRole(['admin', 'user']), updateCart); //modificar carritos
router.post('/:cid/product/:pid', jwtMiddlewareAuthenticate, authorizationRole(['user']), addOneProductInCart); //agrego producto en carrito
router.put('/:cid/product/:pid', jwtMiddlewareAuthenticate, authorizationRole(['admin', 'user']), modifyQuantityCart); //modifico cantidad de producto en carrito
router.delete('/:cid/products/:pid', jwtMiddlewareAuthenticate, authorizationRole(['admin', 'user']), deleteProductInCart); //elimino producto en carrito
router.get('/:cid/purchase', jwtMiddlewareAuthenticate, authorizationRole(['user']), closeCart) //finalizacion de compra

router.use(routingError)


export default router;

