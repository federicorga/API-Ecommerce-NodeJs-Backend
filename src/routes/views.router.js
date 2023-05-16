import { Router } from 'express';

import ProductManager from '../dao/dbManagers/products.manager.js';
import MessagesManager from '../dao/dbManagers/messages.manager.js';

const router=Router();


const productManager = new ProductManager();
const messagesManager = new MessagesManager();

//todo lo que esta dentro de la carpeta views se va a renderizar

router.get('/', async(req,res)=>{

    const products = await productManager.getProducts();
    
    res.render('home', {products} );
})

export default router;


router.get('/realtimeproducts',async (req,res)=>{
    const products = await productManager.getProducts();
    res.render('realTimeProducts',{products});
   

});

router.get('/chat', async(req,res)=>{
    const messages = await messagesManager.getAll();
    res.render('chat',{messages});
})


