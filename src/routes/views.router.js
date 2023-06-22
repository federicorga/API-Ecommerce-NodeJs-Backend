import {Router } from 'express';

import ProductManager from '../dao/dbManagers/products.manager.js';
import MessagesManager from '../dao/dbManagers/messages.manager.js';
import CartManager from '../dao/dbManagers/carts.manager.js';
import passport from 'passport';

const router = Router();


const productManager = new ProductManager();
const messagesManager = new MessagesManager();
const cartManager=new CartManager();

//todo lo que esta dentro de la carpeta views se va a renderizar



router.get('/dashboard',passport.authenticate('jwt',{session:false}), async (req, res) => { //usando SocketIo
    const products = await productManager.getProducts();
    const {role}=req.user //envio el rol de admin

    res.render('dashboard', { products,role });


});

router.get('/chat', async (req, res) => {
    const messages = await messagesManager.getAll();
    res.render('chat', { messages });
});

router.get('/products',passport.authenticate('jwt',{session:false}), async (req, res) => { //visualizar productos con paginación
    const { limit, sort, page, query } = req.query;
    const {cart}=req.user; //envio el carrito al que esta vinculado el usuario
    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productManager.getProductsOrganized(limit, page, query, sort);
    const products = docs;
    res.render('home', {
        products,hasPrevPage, hasNextPage, nextPage, prevPage, limit, query,cart});

})

router.get('/cart/:cid', async (req, res) => { //visualizar un carrito especifico
    let { cid } = req.params
    let { products, _id } = await cartManager.getCartByIdWithProduct(cid);
   
    res.render("cart", {title: "Products", style: "home", products ,_id,cid});

});


router.get('/cookies', (req,res)=>{
    res.render('cookies');
});


//Acceso Públicos y privados
const publicAccess=(req,res,next)=>{
    if(req.user) return res.redirect('/views/profile');
    next();
}

const privateAccess=(req,res,next)=>{
    if(!req.user)return res.redirect('/views/login');
    next();
}

router.get('/register',publicAccess, (req,res)=>{
    res.render('register');
});

router.get('/login',publicAccess, (req,res)=>{
    res.render('login');
});

router.get('/profile',passport.authenticate('jwt',{session:false}),privateAccess, (req,res)=>{// aqui vamos a mostrar los datos de usarios
    
    const{role}=req.user //si existe role, el admin posee el editor
    res.render('profile',{
        user:req.user, //enviamos los datos del usuario
        role
    }); 
});

router.get('/reset',publicAccess, (req,res)=>{
    res.render('reset');
});

export default router;
