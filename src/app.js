import express, { query } from "express";
import ProductManager from "./manager/productManager.js";

const app = express();

const manager = new ProductManager('./src/json/productos.json');


//localhost:8080/products
//localhost:8080/products?limit=...

app.get('/products', async(req, res) =>{
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
})


//localhost:8080/products/(number)
app.get('/products/:pid', async(req, res) =>{
    const productId= Number(req.params.pid);
    console.log(productId)
    const product= await manager.getProductById(productId);
    
    product? res.send(product):res.send("Producto no encontrado");
})





//Levantando Server
app.listen(8080, () => console.log('Listening on port 8080'));

//En Terminal ---> node src/app.js Levantar Server
//Cerrar Server con (CTRL + C)