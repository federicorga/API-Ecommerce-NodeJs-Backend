//CARRITO
import { Router } from 'express';
import CartManager from '../dao/dbManagers/carts.manager.js';



const router = Router();

const cartManager = new CartManager();


router.get('/',async(req,res)=>{ //obtengo todos los carritos
    const result= await cartManager.getCarts();
    return res.send({status: 'success', result: result});
    
});

router.post('/',async (req,res)=>{ // agrego nuevo carrito.
    const result = await cartManager.addNewCart();
        return res.send({status:'success', result:`${result}`});
    

});

router.get('/:cid', async(req,res)=>{ //obtengo el carrito especificado por id
    const cartId= req.params.cid;
    const cart= await cartManager.getCartByIdWithProduct(cartId); // trae el producto completo
    
    cart? res.send(cart):res.send("Producto no encontrado");

});

router.post('/:cid/product/:pid', async(req,res)=>{ //Agrega producto al carrito.
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const result = await cartManager.addProductInCart(cartId,productId);
    return res.send(result);
});

router.put('/:cid/product/:pid', async(req,res)=>{ //actualiza la cantidad de productos agregados en le carrito.
const cartId=req.params.cid;
const productId=req.params.pid;
const quantity=req.body.quantity;
const result =await cartManager.modifyQuantityCart(cartId,productId,quantity)

return res.send(result);
});



router.delete('/:cid', async(req,res)=>{ //limpio el carrito especificado por id (el carrito sigue existiendo)
    try {
        const cartId=req.params.cid;
        const result = await cartManager.cartClean(cartId);
        console.log(result);
        return res.send(result);  
    } catch (error) {
        res.send(500).send({status:'error',error});  
    }
   
});

router.delete('/:cid/products/:pid', async(req,res)=>{ //elimina un producto del carrito
const cartId=req.params.cid;
const productId=req.params.pid;

const result= await cartManager.deleteProductInCart(cartId,productId);
return res.send(result);
});


export default router;