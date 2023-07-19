import { Router } from 'express';

import {
    registerUser,
    sessionsVisits,
    loginUser,
    jwtAuthenticateUser,
    failLogin,
    resetPasswordUser,
    logoutUser,
    gitHubRegister,
    gitHubLogin,

} from '../controller/sessions.controller.js'

import {    jwtMiddlewareAuthenticate,
    githubMiddlewareRegister,
    githubMiddlewareLogin,
    authorizationRole} from '../middleware/passportSessions.middleware.js'
const router = Router();



router.post('/register', registerUser); //registro de usuario
router.get('/session',jwtMiddlewareAuthenticate, sessionsVisits); //cantidad de visitas de usuarios
router.post('/login', loginUser); //inicio de sesion normal usuario
router.get('/current', jwtMiddlewareAuthenticate,authorizationRole(['admin','user']), jwtAuthenticateUser) //Autenticacion con JWT
router.get('/fail-login', failLogin) // redireccion en caso de fallo de inicio sesion usuario
router.post('/reset', resetPasswordUser) //restablecer contraseña
router.get('/logout', logoutUser); // desloguear usuario

//Rutas Github-------s
router.get('/github', githubMiddlewareRegister, gitHubRegister); // me registor con Github
router.get('github-callback', githubMiddlewareLogin, gitHubLogin)//se inicia sesion con Github



export default router;