//(4) Importamos de controller las funciones para ejecutarlas en la rutas
import { Router } from 'express';
import {
    getAllProductsOrganized,
    getProductById,
    addOneProduct, 
    deleteOneProduct,
    updateOneProduct
} from '../controller/products.controller.js'

import { authorizationRole,jwtMiddlewareAuthenticate } from '../middleware/passportSessions.middleware.js';

const router = Router();

router.get('/', getAllProductsOrganized); //obtengo todos los productos
router.get('/:pid', getProductById); //obtengo producto especifico por ID
router.post('/',jwtMiddlewareAuthenticate, authorizationRole(['admin']),addOneProduct); //agrego nuevo producto a la lista de productos
router.delete('/:pid',jwtMiddlewareAuthenticate, authorizationRole(['admin']),deleteOneProduct); //elimino un producto de la lista por ID
router.put('/:pid',jwtMiddlewareAuthenticate, authorizationRole(['admin']),updateOneProduct); //modifico un producto de la lista por ID

export default router