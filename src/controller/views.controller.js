
import{
    getProducts as getproductsService,
getProductsOrganized as getProductsOrganizedService,
addProducts, 
updateProduct, 
deleteProduct, 
getProductId,
getProductsForCategory,
getProductForAscDesc
} from '../services/products.service.js'

import{
    getMessages as getMessagesServices,
    saveMessage
} from '../services/messages.service.js'

import{
    getCarts,
    getCartId,
    getCartdWithProduct as getCartdWithProductServices ,
    addCart,
    addOProductInCart,
    QuantityProductCart,
    cleanCart,
    deleteProductCart,
}from '../services/cart.service.js'



const dashBoardRender = async (req, res) => { //usando SocketIo

    const products = await getproductsService();
    const { role } = req.user //envio el rol de admin

    res.render('dashboard', { products, role });


};

const chatRender = async (req, res) => {
    const messages = await getMessagesServices();
    res.render('chat', { messages });
};

const ProductsRender = async (req, res) => { //visualizar productos con paginación
   
    const { limit, sort, page, query } = req.query;
    const { cart } = req.user; //envio el carrito al que esta vinculado el usuario
    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await getProductsOrganizedService(limit, page, query, sort);
    const products = docs;
    res.render('home', {
        products, hasPrevPage, hasNextPage, nextPage, prevPage, limit, query, cart
    });

};

const CartRender = async (req, res) => { //visualizar un carrito especifico
    let { cid } = req.params
    let { products, _id } = await getCartdWithProductServices(cid);

    res.render("cart", { title: "Products", style: "home", products, _id, cid });

};


const cookiesRender = (req, res) => {
    res.render('cookies');
};


//Acceso Públicos y privados
const publicAccess = (req, res, next) => {
    if (req.user) return res.redirect('/views/profile');
    next();
}

const privateAccess = (req, res, next) => {
    if (!req.user) return res.redirect('/views/login');
    next();
}

const registerRender = (req, res) => {
    res.render('register');
};

const loginRender = (req, res) => {
    res.render('login');
};

const profileRender = (req, res) => {// aqui vamos a mostrar los datos de usarios


    const { role } = req.user //si existe role, el admin posee el editor
    res.render('profile', {
        user: req.user, //enviamos los datos del usuario
        role
    });
};

const resetRender = (req, res) => {
    res.render('reset');
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
