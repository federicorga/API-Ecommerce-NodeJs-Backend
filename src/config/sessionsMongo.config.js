
import express from 'express';
//SESSION
import session from 'express-session'; //para crear usuario e inicio de sesion 
/*es un middleware de Express que proporciona soporte para gestionar sesiones en aplicaciones web. Permite almacenar y mantener datos de sesión para cada usuario que interactúa con tu aplicación.*/
import dotenvConfig from './dotenv.config.js'; //DOTENV PARA SESSION
//MONGOO
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo'; //mongo para conectar los usuarios en mongo

/*connect-mongo es un paquete que proporciona un almacenamiento de sesión para express-session basado en MongoDB. Permite almacenar las sesiones en una base de datos MongoDB en lugar de almacenarlas en la memoria del servidor.*/

const app = express();

const sessionMongo=()=>{ //usamos session con MONGODB (para almacenar la sesion en MONGODB)
app.use(session({
    store: MongoStore.create({ //lugar de almacenamiento de la sesion en (MongoDB)
       client: mongoose.connection.getClient(), //reutilizo la conexion de Mongo DB (Si no existe, crea una) la conexion que se hace en factory
        ttl: 3600 //tiempo de expiracion 3600 segundos
    }),
secret:dotenvConfig.secretSession, /*es una clave secreta que se utiliza para firmar y verificar la autenticidad de las cookies de sesión. La firma de la cookie garantiza que la información de la sesión no pueda ser modificada o manipulada por usuarios no autorizados.*/
resave:true, // determina si la sesión debe guardarse en el almacenamiento,
saveUninitialized:true //determina si se debe guardar una sesión sin cambios en el almacenamiento.
}));

}

export {sessionMongo}