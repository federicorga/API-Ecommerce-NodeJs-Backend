import { Router } from 'express';
import ProductManager from '../manager/productManager.js';

const router=Router();


const productManager = new ProductManager('./src/json/productos.json')

//todo lo que esta dentro de la carpeta views se va a renderizar

router.get('/', async(req,res)=>{

    const products = await productManager.getProducts();
    
    res.render('home', {products} );
})



router.get('/realtimeproducts',async (req,res)=>{
    const products = await productManager.getProducts();
    res.render('realTimeProducts',{products});
   

});


export default router;

