import { Router } from 'express';

import ProductManager from '../dao/dbManagers/products.manager.js';
import MessagesManager from '../dao/dbManagers/messages.manager.js';
import CartManager from '../dao/dbManagers/carts.manager.js';

const router = Router();


const productManager = new ProductManager();
const messagesManager = new MessagesManager();
const cartManager=new CartManager();

//todo lo que esta dentro de la carpeta views se va a renderizar

router.get('/', async (req, res) => {

  

});




router.get('/realtimeproducts', async (req, res) => { //usando SocketIo
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });


});

router.get('/chat', async (req, res) => {
    const messages = await messagesManager.getAll();
    res.render('chat', { messages });
});

router.get('/products', async (req, res) => { //visualizar productos con paginación
    const { limit, sort, page, query } = req.query;
    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productManager.getProductsOrganized(limit, page, query, sort);
    console.log(docs)
    const products = docs;
    res.render('home', {
        products,hasPrevPage, hasNextPage, nextPage, prevPage, limit, query});

})

router.get('/carts/:cid', async (req, res) => { //visualizar un carrito especifico
    let { cid } = req.params
    let { products, _id } = await cartManager.getCartByIdWithProduct(cid);
   
    res.render("cart", {title: "Products", style: "home", products ,_id});

});

export default router;
