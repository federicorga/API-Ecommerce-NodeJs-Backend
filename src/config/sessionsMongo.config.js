
import express from 'express';
import session from 'express-session';

import dotenvConfig from './dotenv.config.js';

import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';



const app = express();

const sessionMongo = () => {
    app.use(session({
        store: MongoStore.create({
            client: mongoose.connection.getClient(),
            ttl: 3600
        }),
        secret: dotenvConfig.secretSession,
        resave: true,
        saveUninitialized: true
    }));

}

export { sessionMongo }