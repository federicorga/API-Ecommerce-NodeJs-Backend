//Productos
import { Router } from 'express';
import ProductsManager from '../dao/dbManagers/products.manager.js';

const router=Router();


const manager = new ProductsManager(); //instancia de la clase ProductManager


//localhost:8080/api/products
//localhost:8080/api/products?limit=(numero)

router.get('/', async(req, res) =>{
        try{
    const products = await manager.getProducts();
    const {limit}=req.query;
    console.log(limit);
    if(limit!==undefined){
        let prod=[];
        for (let i = 0; i < limit; i++) {
            
           if(products[i]!==undefined){
            prod.push(products[i]);}
           
        }

        return res.send(prod);
    }
    
 
    res.send(products);
    
    } catch (error) {
        res.send(500).send({status:'error',error});
        
    }
    
});


//localhost:8080/api/products/(number)
router.get('/:pid', async(req, res) =>{
    const productId= req.params.pid;
    console.log(productId)
    const product= await manager.getProductById(productId);
    
    product? res.send(product):res.send("Producto no encontrado");
});


//CREATED desde Body / Raw
router.post('/',async (req,res)=>{
    const producte = await req.body;
    const result = await manager.addProducts(producte);
        return res.send({status:'success', result:`${result}`});
    

});


router.delete('/:pid', async(req, res) =>{
    const productId= req.params.pid;
    console.log(productId)
    const product= await manager.getProductById(productId);
    
    product? res.send(await manager.deleteProduct(productId)):res.send("Producto no encontrado");

    
});

router.put('/:pid', async(req, res) =>{

    const productId= req.params.pid;
    console.log(productId);
    const newProduct = await req.body;
    console.log(newProduct);
    const result = await manager.updateProduct(productId,newProduct);

    
    res.send({status: 'success', result:`${result}`});

});





export default router;


