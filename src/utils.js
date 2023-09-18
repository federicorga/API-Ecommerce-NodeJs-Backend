import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import config from './config/dotenv.config.js';

import nodemailer from 'nodemailer'

const PORT = config.port;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export { __dirname, PORT };

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

export const PRIVATE_KEY = config.privateKey;
export const PRIVATE_KEY_GITHUB = config.privateKeyGithub;

export const generateToken = (user) => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' });

    return token;
};

export const authToken = (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken) return res.status(401).send({ error: 'Not authenticated' });

    const token = authToken.split(' ')[1];

    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({ error: 'Not authorized' });
        req.user = credentials.user;
        next();
    });
};


export const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.userNodemailer,
        pass: config.passNodemailer
    }
})

