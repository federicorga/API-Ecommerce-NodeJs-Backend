
import * as productsService from '../services/products.service.js'
import * as messagesService from '../services/messages.service.js'
import * as cartService from '../services/cart.service.js'
import * as usersService from '../services/user.service.js'
import { privateAccess, publicAccess } from '../middlewares/accessUsers.middleware.js';

const dashBoardRender = async (req, res) => {
    try {
        const products = await productsService.getAllProductsOrganized();
        const { role } = req.user
        res.render('dashboard', { products, role });

    } catch (error) {
        req.logger.error(error.message);
        res.status(500).send({ status: 'error', error: error.message });
    }
};
const chatRender = async (req, res) => {
    try {
        const messages = await messagesService.getMessages();
        res.render('chat', { messages });
    } catch (error) {
        req.logger.error(error.message);
        res.status(500).send({ status: 'error', error: error.message });
    }
};
const ProductsRender = async (req, res) => {
    try {
        const { limit, sort, page, query } = req.query;
        const { cart } = req.user;
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productsService.getAllProductsOrganized(limit, page, query, sort);
        const products = docs;
        res.render('home', {
            products, hasPrevPage, hasNextPage, nextPage, prevPage, limit, query, cart
        });
    } catch (error) {
        req.logger.error(error.message);
        res.status(500).send({ status: 'error', error: error.message });
    }

};

const CartRender = async (req, res) => {
    try {
        let { cid } = req.params

        let { products, _id } = await cartService.getCartByIdWithProduct(cid);

        res.render("cart", { title: "Products", style: "home", products, _id, cid });
    } catch (error) {
        req.logger.error(error.message);
        res.status(500).send({ status: 'error', error: error.message });
    }

};


const cookiesRender = (req, res) => {
    try {
        res.render('cookies');
    } catch (error) {
        req.logger.error(error.message);
        res.status(500).send({ status: 'error', error: error.message });
    }

};

const registerRender = (req, res) => {
    try {
        res.render('register');
    } catch (error) {
        req.logger.error(error.message);
        res.status(500).send({ status: 'error', error: error.message });
    }

};
const loginRender = (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        req.logger.error(error.message);
        res.status(500).send({ status: 'error', error: error.message });
    }

};
const profileRender = (req, res) => {
    try {
        const role = req.user.role
        let viewsRole;
        if (role === 'admin') viewsRole = true;
        if (role === 'user') viewsRole = false;

        res.render('profile', {
            user: req.user,
            role: viewsRole
        });
    } catch (error) {
        req.logger.error(error.message);
        res.status(500).send({ status: 'error', error: error.message });
    }

};

const resetRender = (req, res) => {
    try {
        res.render('reset');
    } catch (error) {
        req.logger.error(error.message);
        res.status(500).send({ status: 'error', error: error.message });
    }

};

const usersView = async (req, res) => {
    const user = req.user;

    let users = await usersService.getAllUsers();

    try {
        res.render("users", {
            title: "users",
            style: "style",
            logued: true,
            users,
            admin: user.role === "admin",
            role: user.role === "admin" || user.role === "premium",
        });
    } catch (error) {
        req.logger.error(error.message);
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
    privateAccess,
    usersView
}
