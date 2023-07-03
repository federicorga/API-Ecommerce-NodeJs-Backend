//(4) Importamos de controller las funciones para ejecutarlas en la rutas
import { Router } from 'express';
import {
    getProducts,
    getProductId,
    addProducts,
    deleteProductId,
    updateProductId
} from '../controller/products.controller.js'

const router = Router();

router.get('/', getProducts); //obtengo todos los productos
router.get('/:pid', getProductId); //obtengo producto especifico por ID
router.post('/', addProducts); //agrego nuevo producto a la lista de productos
router.delete('/:pid', deleteProductId); //elimino un producto de la lista por ID
router.put('/:pid', updateProductId); //modifico un producto de la lista por ID

export default router