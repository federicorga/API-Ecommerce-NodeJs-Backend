import { Router } from 'express';

import {
    setCookie,
    getAllcookies,
    deleteOneCookie,
    signedCookie,
    saveSignedCookie,
    addNewCookie
} from '../controller/cookies.controller.js';

const router = Router();


router.get('/set-cookie', setCookie); //obtener cookie seteada (codificada);
router.get('/', getAllcookies); //mostrar todas las cookies
router.get('/delete-cookie/:cookie', deleteOneCookie); //eliminar cookie especifica
router.get('/set-signed-cookie', signedCookie); //firmar la cookie
router.get('/signed-cookie', saveSignedCookie); //se alamcena la cookie firmada
router.post('/', addNewCookie) //crear nueva cookie

export default router