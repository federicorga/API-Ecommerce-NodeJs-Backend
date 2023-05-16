//CARRITO
import { Router } from 'express';
import CartManager from '../dao/dbManagers/carts.manager.js';



const router = Router();

const cartManager = new CartManager();


router.get('/',async(req,res)=>{
    const result= await cartManager.getCarts();
    return res.send({status: 'success', result: result})
})

router.post('/',async (req,res)=>{
    const result = await cartManager.addNewCart();
        return res.send({status:'success', result:`${result}`});
    

});

router.get('/:cid', async(req,res)=>{
    const cartId= req.params.cid;
    const cart= await cartManager.getCartById(cartId);
    
    cart? res.send(cart):res.send("Producto no encontrado");

})

router.post('/:cid/product/:pid', async(req,res)=>{
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const result = await cartManager.addProductInCart(cartId,productId);
    return res.send(result);
})


export default router;