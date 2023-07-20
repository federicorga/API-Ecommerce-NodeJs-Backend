
import * as productsService from '../services/products.service.js'
import * as messagesService from '../services/messages.service.js'
import * as cartService from '../services/cart.service.js'
import { privateAccess, publicAccess } from '../middlewares/accessUsers.middleware.js';

const dashBoardRender = async (req, res) => { //usando SocketIo
    try {
        const products = await productsService.getAllProductsOrganized();
        const { role } = req.user //envio el rol de admin
        res.render('dashboard', { products, role });

    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
};
const chatRender = async (req, res) => {
    try {
        const messages = await messagesService.getMessages();
        res.render('chat', { messages });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
};
const ProductsRender = async (req, res) => { //visualizar productos con paginación
    try {
        const { limit, sort, page, query } = req.query;
        const { cart } = req.user; //envio el carrito al que esta vinculado el usuario
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productsService.getAllProductsOrganized(limit, page, query, sort);
        const products = docs;
        res.render('home', {
            products, hasPrevPage, hasNextPage, nextPage, prevPage, limit, query, cart
        });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }

};

const CartRender = async (req, res) => { //visualizar un carrito especifico
    try {
        let { cid } = req.params
        let { products, _id } = await cartService.getCartByIdWithProduct(cid);
        res.render("cart", { title: "Products", style: "home", products, _id, cid });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }

};


const cookiesRender = (req, res) => {
    try {
        res.render('cookies');
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }

};

const registerRender = (req, res) => {
    try {
        res.render('register');
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }

};
const loginRender = (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }

};
const profileRender = (req, res) => {// aqui vamos a mostrar los datos de usarios
    try {
        const role = req.user.role //role admin o user (solo aplica para vistas views)
        let viewsRole;
        if(role==='admin')viewsRole=true;
        if(role==='user') viewsRole=false;
      
        res.render('profile', {
            user: req.user, //enviamos los datos del usuario
            role:viewsRole
        });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }

};

const resetRender = (req, res) => {
    try {
        res.render('reset');
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }

};

export {
    dashBoardRender,
    chatRender,
    ProductsRender,
    CartRender,
    cookiesRender,
    registerRender,
    loginRender,
    profileRender,
    resetRender,
    publicAccess,
    privateAccess
}
