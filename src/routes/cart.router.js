import { Router } from 'express';
import{
    getCarts,
    getCartdWithProduct,
    addCart,
    addOProductInCart,
    QuantityProductCart,
    cleanCart,
    deleteProductCart
}from '../controller/cart.controller.js'



const router = Router();


router.get('/',getCarts); //obtengo todos los carritos
router.post('/',addCart); //agrego un nuevo carrito
router.get('/:cid',getCartdWithProduct); //obtengo un carrito
router.post('/:cid/product/:pid',addOProductInCart); //agrego producto en carrito
router.put('/:cid/product/:pid', QuantityProductCart); //modifico cantidad de producto en carrito
router.delete('/:cid',cleanCart); //limpio carrito
router.delete('/:cid/products/:pid', deleteProductCart); //elimino producto en carrito


export default router;

