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
    jwtMiddlewareAuthenticate,
    githubMiddlewareRegister,
    githubMiddlewareLogin
} from '../controller/sessions.controller.js'

const router = Router();



router.post('/register', registerUser); //registro de usuario
router.get('/session', sessionsVisits); //cantidad de visitas de usuarios
router.post('/login', loginUser); //inicio de sesion normal usuario
router.get('/current',jwtMiddlewareAuthenticate, jwtAuthenticateUser) //Autenticacion con JWT
router.get('/fail-login', failLogin) // redireccion en caso de fallo de inicio sesion usuario
router.post('/reset', resetPasswordUser) //restablecer contraseña
router.get('/logout', logoutUser); // desloguear usuario

//rutas Github-------s
router.get('/github',githubMiddlewareRegister, gitHubRegister); // me registor con Github
router.get('github-callback',githubMiddlewareLogin, gitHubLogin)//se inicia sesion con Github



export default router;