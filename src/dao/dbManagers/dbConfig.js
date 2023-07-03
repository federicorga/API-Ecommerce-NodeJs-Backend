import mongoose from 'mongoose';
import config from '../../config/config.js';

const URI = config.mongoUrl;

try {
    await mongoose.connect('mongodb+srv://fedeex22:Mongo1234568@cluster39760ap.pxf6a45.mongodb.net/?retryWrites=true&w=majority');
    console.log('***Conectado a BDD***');
} catch (error) {
    console.log(error);    
}


 /*
 const DB_USER = "fedeex22"; //usario Mongo
const DB_PASS = "Mongo1234568"; //contraseña Mongo*/

