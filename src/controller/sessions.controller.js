
import { authToken, createHash, generateToken, isValidPassword } from '../utils.js';

import CustomError from '../middlewares/Errors/CustomError.js';
import EErrors from '../middlewares/errors/enums.js';
import * as generateError from '../middlewares/errors/info.js';
import * as userService from '../services/user.service.js'
import * as cartService from '../services/cart.service.js'

const registerUser = async (req, res) => {
   
    const { first_name, last_name, email, age, password } = req.body;
    try {
        
    } catch (error) {
        
    }
    if (!first_name || !last_name || !email || !password){
        throw CustomError.createError({
            name: 'UserError',
            cause: generateError.userErrorInfo({
                first_name,
                last_name,
                email,
                password
            }),
            message: 'Error trying to create user',
            code: EErrors.INVALID_TYPE_ERROR
        });
    }
        const cart = await cartService.addNewCart(); //se genera un nuevo carrito para el usuario
        const exists = await userService.getOneUser({ email });
        if (exists) {
            res.send({ status: 'error ', error: 'user exist' }); //el usuario ya existe mediante el false y no puede registrarse nuevamente
        }
        const userToSave = {
            first_name,
            last_name,
            email,
            age,
            cart,
            password: createHash(password), //se importa de utils esto hashea la contraseña y la guarda en la bd
        };
        const result = await userService.addNewUser(userToSave);
        const accessToken = generateToken(result); //generamos el token al registrar
        res.send({ status: 'success', message: 'User registered', access_token: accessToken })


};
const sessionsVisits = (req, res) => {
    try {
        if (req.session.counter) {
            req.session.counter++;
            res.send(`se a visitado el sitio ${req.session.counter} veces`)
        } else {
            req.session.counter = 1
            res.send(`Bienvenido`)
        }
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }

};

const loginUser = async (req, res) => {
    
        const { email, password } = req.body;

        if(!email || ! password) throw CustomError.createError({
            name:'loginError',
            cause:generateError.loginErrorInfo({
                email,
                password
            }),
            message: 'Error trying to login user',
            code: EErrors.AUTHENTICATION_ERROR
        });
        
        const user = await userService.getOneUser({ email: email }); //busco en la BD
        if (!user) return res.status(400).send({ status: 'error', error: 'Invalid credentials' });
        if (!isValidPassword(user, password)) return res.status(400).send({ status: 'error', error: 'Invalid password' });//verifica si las contraseñas coinicden
        const userFind = {
            first_name: user.first_name,
            last_name: user.last_name,
            age: user.age,
            email: user.email,
            role: user.role,
            cart: user.cart
        };
        //si el login se hace de manera exitosa va a setear el req.User
        const accessToken = generateToken(userFind); //generamos el token
        res.cookie('eCookieToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: false } //enviamos el accesToken a la cookie del front
            // y esta cookie solo estara valida a travez de una peticion html con httpOnly(le da seguridad)
        ).send({ status: 'success' })


};

const jwtAuthenticateUser = (req, res) => {
    try {
        
        res.send({ status: 'success', payload: req.user });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });

    }
};

const failLogin = async (req, res) => { //passport redirige a esta rutra si el registro falla podemos poner cualquiera
    try {
        res.send({ status: 'error', message: 'Login failed!' })
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }

};
const resetPasswordUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send({ status: 'error', error: 'Incomplete values' });
        const user = await userService.getOneUser({ email });
        if (!user) return res.send(400).send({ status: 'error', error: ' user not found' });
        user.password = createHash(password); //hasheamos la nueva contraseña
        await userService.updatePasswordUser({ email }, user); //subimos la nueva contraseña hasheada

        res.send({ status: 'success', message: 'Password reset!' })

    } catch (error) {

        res.status(500).send({ status: 'error', error: error.message });

    }

};
const logoutUser = (req, res) => {
    try {
        res.clearCookie('eCookieToken');
        req.session.destroy(error => {
            if (error) return res.status(500).send({ status: 'error', error: 'Logout fail!' });
            res.redirect('/views/login'); //con esto redireccionamos a la ruta raiz al finalizar la sesion
        });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }

};

const gitHubRegister = async (req, res) => {
    try {
        res.send({ status: "success", message: "User registered" })
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }

};



const gitHubLogin = async (req, res) => {

    try {
        req.session.user = req.user;
        res.redirect('/views/profile');
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }

};



export {
    registerUser,
    sessionsVisits,
    loginUser,
    jwtAuthenticateUser,
    failLogin,
    resetPasswordUser,
    logoutUser,
    gitHubRegister,
    gitHubLogin,
}