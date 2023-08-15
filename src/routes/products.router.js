//(4) Importamos de controller las funciones para ejecutarlas en la rutas
import { Router } from 'express';
import {
    getAllProductsOrganized,
    getProductById,
    addOneProduct, 
    deleteOneProduct,
    updateOneProduct
} from '../controller/products.controller.js'

import { authorizationRole,jwtMiddlewareAuthenticate } from '../middlewares/passportSessions.middleware.js';

import { routingError } from '../middlewares/errors/routingError.middleware.js';

const router = Router();

router.get('/', getAllProductsOrganized); //obtengo todos los productos
router.post('/',jwtMiddlewareAuthenticate, authorizationRole(['admin','premium']),addOneProduct); //agrego nuevo producto a la lista de productos
router.get('/:pid', getProductById); //obtengo producto especifico por ID
router.put('/:pid',jwtMiddlewareAuthenticate, authorizationRole(['admin']),updateOneProduct); //modifico un producto de la lista por ID
router.delete('/:pid',jwtMiddlewareAuthenticate, authorizationRole(['admin','premium']),deleteOneProduct); //elimino un producto de la lista por ID


router.use(routingError)

export default router