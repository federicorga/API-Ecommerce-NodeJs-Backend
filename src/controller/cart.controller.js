
import { 
    getCarts as getCartsService,
    getCartId as getCartIdService,
    getCartdWithProduct as getCartdWithProductService,
    addCart as addCartService,
    addOProductInCart as addOProductInCartService,
    QuantityProductCart as QuantityProductCartService,
    cleanCart as cleanCartService,
    deleteProductCart as deleteProductCartService
} from '../services/cart.service.js'


    const getCarts = async(req,res)=>{ //obtengo todos los carritos
        const result= await getCartsService();
        return res.send({status: 'success', result: result});
        
    };
    
    const addCart = async (req,res)=>{ // agrego nuevo carrito.
        const result = await addCartService();
            return res.send({status:'success', result:`${result}`});
        
    
    };
    
    const getCartdWithProduct= async(req,res)=>{ //obtengo el carrito especificado por id
        const cartId= req.params.cid;
        const cart= await getCartdWithProductService(cartId); // trae el producto completo
        
        cart? res.send(cart):res.send("Producto no encontrado");
    
    };
    
    const addOProductInCart= async(req,res)=>{ //Agrega producto al carrito.
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const result = await addOProductInCartService(cartId,productId);
        return res.send(result);
    };
    
    const QuantityProductCart= async(req,res)=>{ //actualiza la cantidad de productos agregados en le carrito.
    const cartId=req.params.cid;
    const productId=req.params.pid;
    const quantity=req.body.quantity;
    const result =await QuantityProductCartService(cartId,productId,quantity)
    
    return res.send(result);
    };
    
    
    
    const cleanCart= async(req,res)=>{ //limpio el carrito especificado por id (el carrito sigue existiendo)
        try {
            const cartId=req.params.cid;
            const result = await cleanCartService(cartId);
            return res.send(result);  
        } catch (error) {
            res.send(500).send({status:'error',error});  
        }
       
    };
    
    const deleteProductCart= async(req,res)=>{ //elimina un producto del carrito
    const cartId=req.params.cid;
    const productId=req.params.pid;
    
    const result= await deleteProductCartService(cartId,productId);
    return res.send(result);
    };

export{

    getCarts,
    getCartdWithProduct,
    addCart,
    addOProductInCart,
    QuantityProductCart,
    cleanCart,
    deleteProductCart
}