//Productos
import { Router } from 'express';
import ProductsManager from '../dao/dbManagers/products.manager.js';

const router=Router();


const manager = new ProductsManager(); //instancia de la clase ProductManager


//localhost:8080/api/products
//localhost:8080/api/products?limit=(numero)

router.get('/', async(req, res) =>{
        try{
    const {limit,sort,page,query}=req.query;
    
    const respound = await manager.getProductsOrganized(limit,page,query,sort);
  
    return res.send(respound);
    
    } catch (error) {
        res.send(500).send({status:'error',error});
        }

});


//localhost:8080/api/products/(number)
router.get('/:pid', async(req, res) =>{
    const productId= req.params.pid;
    const product= await manager.getProductById(productId);
    
    product? res.send(product):res.send("Producto no encontrado");
});


//CREATED desde Body / Raw
router.post('/',async (req,res)=>{
    const producte = req.body;
    const result = await manager.addProducts(producte);
        return res.send({status:'success', result:`${result}`});
    

});


router.delete('/:pid', async(req, res) =>{
    const productId= req.params.pid;
    
    const product= await manager.getProductById(productId);
    
    product? res.send(await manager.deleteProduct(productId)):res.send("Producto no encontrado");

    
});

router.put('/:pid', async(req, res) =>{

    const productId= req.params.pid;
  
    const newProduct = await req.body;

    const result = await manager.updateProduct(productId,newProduct);

    
    res.send({status: 'success', result:`${result}`});

});





export default router;


