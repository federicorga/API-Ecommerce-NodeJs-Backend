
import { createHash, generateToken, isValidPassword } from '../utils.js'

import CustomError from '../middlewares/errors/CustomError.js';

import EErrors from '../middlewares/errors/enums.js';
import * as generateError from '../middlewares/errors/info.js';
import * as userService from '../services/user.service.js'
import * as cartService from '../services/cart.service.js'


const registerUser = async (req, res) => {

    const { first_name, last_name, email, age, password } = req.body;
    try {

    } catch (error) {
        req.logger.error(error.message);

    }
    if (!first_name || !last_name || !email || !password) {
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
    const cart = await cartService.addNewCart();
    const exists = await userService.getOneUser({ email });
    if (exists) {
        res.send({ status: 'error ', error: 'user exist' });
    }
    const userToSave = {
        first_name,
        last_name,
        email,
        age,
        cart,
        password: createHash(password),
    };
    const result = await userService.addNewUser(userToSave);
    const accessToken = generateToken(result);

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
        req.logger.error(error.message);
        res.status(500).send({ status: 'error', error: error.message });
    }

};

const loginUser = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) throw CustomError.createError({
        name: 'loginError',
        cause: generateError.loginErrorInfo({
            email,
            password
        }),
        message: 'Error trying to login user',
        code: EErrors.AUTHENTICATION_ERROR
    });

    const user = await userService.getOneUser({ email: email });
    if (!user) return res.status(401).send({ status: 'error', error: 'Invalid credentials' });
    if (!isValidPassword(user, password)) return res.status(401).send({ status: 'error', error: 'Invalid password' });
    const userFind = {
        first_name: user.first_name,
        last_name: user.last_name,
        age: user.age,
        email: user.email,
        role: user.role,
        cart: user.cart,

    };
    await userService.setLastConnection(user._id);
    const accessToken = generateToken(userFind);


    res.cookie('eCookieToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: false }

    ).send({ status: 'success' })


};

const jwtAuthenticateUser = (req, res) => {
    try {
        res.send({ status: 'success', payload: req.user });
    } catch (error) {
        req.logger.error(error.message);
        res.status(500).send({ status: 'error', error: error.message });
    }
};

const failLogin = async (req, res) => {
    try {
        res.send({ status: 'error', message: 'Login failed!' })
    } catch (error) {
        req.logger.error(error.message);
        res.status(500).send({ status: 'error', error: error.message });
    }

};
const resetPasswordUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send({ status: 'error', error: 'Incomplete values' });
        const user = await userService.getOneUser({ email });
        if (!user) return res.send(400).send({ status: 'error', error: ' user not found' });
        user.password = createHash(password);
        await userService.updatePasswordUser({ email }, user);

        res.send({ status: 'success', message: 'Password reset!' })

    } catch (error) {
        req.logger.error(error.message);

        res.status(500).send({ status: 'error', error: error.message });

    }

};
const logoutUser = async (req, res) => {
    try {
        const user = req.user;
        await userService.setLastConnection(user._id);
        res.clearCookie('eCookieToken');
        req.session.destroy(error => {
            if (error) return res.status(500).send({ status: 'error', error: 'Logout fail!' });

            res.redirect('/views/login');
        });
    } catch (error) {
        req.logger.error(error.message);
        res.status(500).send({ status: 'error', error: error.message });
    }

};

const gitHubRegister = async (req, res) => {
    try {
        res.send({ status: "success", message: "User registered" })
    } catch (error) {
        req.logger.error(error.message);
        res.status(500).send({ status: 'error', error: error.message });
    }

};

const gitHubLogin = async (req, res) => {

    try {
        req.session.user = req.user;
        res.redirect('/views/profile');
    } catch (error) {
        req.logger.error(error.message);
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