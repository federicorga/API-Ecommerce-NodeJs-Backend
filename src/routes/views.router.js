import { Router } from 'express';

import{
    jwtMiddlewareAuthenticate
} from '../controller/sessions.controller.js'

import{
    dashBoardRender,
    chatRender,
    ProductsRender,
    CartRender,
    cookiesRender,
    registerRender,
    loginRender,
    profileRender,
    resetRender,
    publicAccess,
    privateAccess
}from '../controller/views.controller.js'

const router=Router();


router.get('/dashboard',jwtMiddlewareAuthenticate,dashBoardRender); //vista de administracion
router.get('/chat', chatRender); //vista de chat
router.get('/products',jwtMiddlewareAuthenticate,ProductsRender); //vista de producto
router.get('/cart/:cid', CartRender); //vista de carrito
router.get('/cookies',cookiesRender); // cookies
router.get('/register',publicAccess,registerRender); //vista de registro
router.get('/login',publicAccess,loginRender); //vista de login
router.get('/profile',jwtMiddlewareAuthenticate,privateAccess,profileRender); //vista de perfil
router.get('/reset',publicAccess,resetRender); // reseteo de contraseña

export default router;