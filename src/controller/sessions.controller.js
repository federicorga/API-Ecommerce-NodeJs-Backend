import passport from 'passport';
import { authToken, createHash, generateToken, isValidPassword } from '../utils.js';
import {
    getUser as getUserService,
    addUser as addUserService,
    updatePassword as updatePasswordService,
    getUser
} from '../services/user.service.js'

import { addCart as addCartService } from '../services/cart.service.js'


const registerUser = async (req, res) => {

    const { first_name, last_name, email, age, password } = req.body;
    const cart = await addCartService(); //se genera un nuevo carrito para el usuario
    try {
        const exists = await getUserService({ email });
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

        const result = await addUserService(userToSave);

        const accessToken = generateToken(result); //generamos el token al registrar
        res.send({ status: 'success', message: 'User registered', access_token: accessToken })

    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error: error.message });
    }

};

const sessionsVisits = (req, res) => {
    if (req.session.counter) {
        req.session.counter++;
        res.send(`se a visitado el sitio ${req.session.counter} veces`)
    } else {
        req.session.counter = 1
        res.send(`Bienvenido`)
    }
};
const loginUser = async (req, res) => {

    const { email, password } = req.body;


    try {
        const user = await getUser({ email: email }); //busco en la BD

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

    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    }

};

const jwtMiddlewareAuthenticate = passport.authenticate('jwt', { session: false });

const jwtAuthenticateUser = (req, res) => { //trabajamos con un middleware de jwt passport y ponemos el nombre de la estrategia register de config
    //sessions false es porque ya no se trabaja con session
    res.send({ status: 'success', payload: req.user });
};

const failLogin = async (req, res) => { //passport redirige a esta rutra si el registro falla podemos poner cualquiera
    res.send({ status: 'error', message: 'Login failed!' })
};
const resetPasswordUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send({ status: 'error', error: 'Incomplete values' });

        const user = await getUser({ email });

        if (!user) return res.send(400).send({ status: 'error', error: ' user not found' });

        user.password = createHash(password); //hasheamos la nueva contraseña

        await updatePasswordService({ email }, user); //subimos la nueva contraseña hasheada

        res.send({ status: 'success', message: 'Password reset!' })

    } catch (error) {

        res.status(500).send({ status: 'error', error: error.message });

    }

};
const logoutUser = (req, res) => {

    res.clearCookie('eCookieToken');
    req.session.destroy(error => {
        if (error) return res.status(500).send({ status: 'error', error: 'Logout fail!' });

        res.redirect('/views/login'); //con esto redireccionamos a la ruta raiz al finalizar la sesion
    })
};

const githubMiddlewareRegister = passport.authenticate('github', { scope: ['user:email'] });
const gitHubRegister = async (req, res) => {

    res.send({ status: "success", message: "User registered" })
};


const githubMiddlewareLogin = passport.authenticate('github', { failureRedirect: '/login' });

const gitHubLogin = async (req, res) => {


    req.session.user = req.user;
    res.redirect('/views/profile')
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
    jwtMiddlewareAuthenticate,
    githubMiddlewareRegister,
    githubMiddlewareLogin

}