import mongoose from 'mongoose';
import config from '../../config/dotenv.config.js';

const URL = config.mongoUrl
try {
    await mongoose.connect(config.mongoUrl);
    console.log('***Conectado a BDD***');
} catch (error) {
    console.log(error);    
}


 /*
 const DB_USER = "fedeex22"; //usario Mongo
const DB_PASS = "Mongo1234568"; //contraseña Mongo*/

