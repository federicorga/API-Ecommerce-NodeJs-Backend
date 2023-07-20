import { Router } from 'express';

import {
    jwtMiddlewareAuthenticate,
    authorizationRole,
    passportCall
} from '../middlewares/passportSessions.middleware.js'

import {
    publicAccess,
    privateAccess,
} from '../middlewares/accessUsers.middleware.js'

import {
    dashBoardRender,
    chatRender,
    ProductsRender,
    CartRender,
    cookiesRender,
    registerRender,
    loginRender,
    profileRender,
    resetRender
} from '../controller/views.controller.js'

import { routingError } from '../middlewares/errors/routingError.middleware.js';

const router = Router();


router.get('/dashboard', jwtMiddlewareAuthenticate,authorizationRole(['admin']), dashBoardRender); //vista de administracion
router.get('/chat',jwtMiddlewareAuthenticate,authorizationRole(['user']), chatRender); //vista de chat
router.get('/products',jwtMiddlewareAuthenticate, ProductsRender); //vista de producto
router.get('/cart/:cid',jwtMiddlewareAuthenticate,privateAccess,authorizationRole(['admin','user']),CartRender); //vista de carrito
router.get('/cookies', cookiesRender); // cookies
router.get('/register', publicAccess, registerRender); //vista de registro
router.get('/login', publicAccess, loginRender); //vista de login
router.get('/profile', jwtMiddlewareAuthenticate, privateAccess, profileRender); //vista de perfil
router.get('/reset', publicAccess, resetRender); // reseteo de contraseña

router.use(routingError) //captura todas las rutas que no coincidan y devuelven error



export default router;