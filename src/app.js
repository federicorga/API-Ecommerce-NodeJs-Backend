//CONFIGURACION PARA SOPORTE
import express from 'express';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';

import {__dirname, PORT} from './utils.js';
import cookieParser from 'cookie-parser'; // el cookie es como un middleware

//PASSPORT
import initializePassport from './config/passport.config.js';
import passport from 'passport';

//SESSIONS-MONGO
//import {sessionMongo} from './config/sessionsMongo.config.js';

//Compressor
import compression from 'express-compression';


//ROUTERS
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import userCookies from './routes/cookies.router.js';
import sessionsRouter from './routes/sessions.router.js';
import loggerTestRouter from './routes/loggerTest.router.js';
//import userRouter from './routes/users.router.js' //fuera de uso, se usa session

//MOKING ROUTER
import mokingRouter from './routes/moking.router.js'

//MANAGER PARA SOCKET
import ProductsManagerDB from './dao/dbManagers/classes/products.mongo.js';
import MessagesManager from './dao/dbManagers/classes/messages.mongo.js';

//-----

//SESSION
import session from 'express-session'; //para crear usuario e inicio de sesion 
/*es un middleware de Express que proporciona soporte para gestionar sesiones en aplicaciones web. Permite almacenar y mantener datos de sesión para cada usuario que interactúa con tu aplicación.*/
import dotenvConfig from './config/dotenv.config.js';//DOTENV PARA SESSION
//MONGOO
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo'; //mongo para conectar los usuarios en mongo

//ERRORS
import errorHandler from './middlewares/errors/errors.middleware.js'; //Middleware de Errors (Manejador de errores)

//LOGGERS
import {addLogger } from './loggers/logger.js';
import {logger} from './loggers/logger.js';


const app = express();


//Configuracion para Soporte 
app.use(express.json()); // Permite soportar y recibir formatos JSON (desde el front y el back)
app.use(express.urlencoded({extended: true})); //permite soportar rutas con codigos y caracteres especiales (ejemplo el @ de un gmail)
app.use(express.static(`${__dirname}/public`)); //usamos la carpeta public de manera estatica. con path absoluto __dirname.
app.use(cookieParser()); //activamos el uso de cookies; //podemos firmar cookie poniendo dentro de cookieParser un 'secret'

//Configuracion express-handelbars (Motor de plantilla)
app.engine('handlebars', handlebars.engine()); //engine(), es un método en Express.js que registra un motor de plantilla en la aplicación
app.set('views',`${__dirname}/views`); //indicar donde estan almacenadas nuestras vistas.
app.set('view engine', 'handlebars'); //Configuracion para decirle a express que use handlebars como motor de plantilla.
//views engine se refiere al motor de plantillas que se utilizará 
//Configuracion para agregar funcionalidad de archivos estáticos. (poder usar la carpeta public).
//esto permite acceder a archivos css,js y cualquier archivo y carpeta dentro de public. Todo lo que esta dentor de public es estatico.

//-------------------
//usamos session con MONGODB
app.use(session({
    store: MongoStore.create({ //lugar de almacenamiento de la sesion en (MongoDB)
       client: mongoose.connection.getClient(), //reutilizo la conexion de Mongo DB (Si no existe, crea una) la conexion que se hace en factory
        ttl: 3600 //tiempo de expiracion 3600 segundos
    }),
secret:dotenvConfig.secretSession, /*es una clave secreta que se utiliza para firmar y verificar la autenticidad de las cookies de sesión. La firma de la cookie garantiza que la información de la sesión no pueda ser modificada o manipulada por usuarios no autorizados.*/
resave:true, // determina si la sesión debe guardarse en el almacenamiento,
saveUninitialized:true //determina si se debe guardar una sesión sin cambios en el almacenamiento.
}));

//-------------------

//PASSPORT Se inicializa en app a nivel global debe ir debajo de Session
/*al llamar primero initializePassport() se asegura de que las estrategias de autenticación estén configuradas y listas para ser utilizadas por Passport.*/ 
initializePassport();
app.use(passport.initialize()); //se utiliza para inicializar Passport y agregarlo como middleware a tu aplicación Express
app.use(passport.session()); //se utiliza para agregar soporte de sesiones a Passport. 
//------------------------------

app.use(compression({
    brotli:{enable:true, zlib:{}} //trabjamos con brotli que comprime un 30% mas eficiente que compression solo.
    //Zlib es el nivel de compresion que en el caso de usar brotli debe ir vacio (entre mas nivel mayor compresion del 1 a 9)
})); //comprime los request para enviar al frontend con menor tamaño


//LOGGER
app.use(addLogger)

//RUTAS
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/views',viewsRouter);
app.use('/api/cookies',userCookies);
app.use('/api/sessions', sessionsRouter);
app.use('/moking-products',mokingRouter)// ruta moking de prueba muestra 100 productos
app.use('/loggerTest',loggerTestRouter)
//app.use('/api/users',userRouter); se usa sessions




//ERRORES MIddleware Global
app.use(errorHandler);
//Levantando Server

const httpServer= app.listen(PORT, () => logger.info(`Server running on port http://localhost:${PORT}`)); //Server http
const socketServer= new Server(httpServer); //server Socket.io


//handshake ( saludo de manos, servidor ligado).
socketServer.on('connection', async socket=>{
    logger.info("Nuevo cliente conectado") //cuando abro una nueva pestaña del navegador deberia mostrarse lo que esta dentro de esta conexion.
    socket.on('message', data=>{ //lee el evento del frontend llamado mensaje y lo muestra.
        //console.log(data) - muestra los datos de mensaje en la consola usar para configurar
    });
    const productManager = new ProductsManagerDB()
    const products=await productManager.getAllProducts()
    socketServer.emit('real_time_products', {products:products});
    const messageManager=new MessagesManager();
    socket.on('message',async (data)=>{ //recibo mensaje de usuario recibo datos por eso data  
         await messageManager.saveMessage(data)//guardo esos mensajes datos en el array
         let messages= await messageManager.getMessages();
         socketServer.emit('messageLogs', messages); // envio un mensajea todos mis usuarios con el array modificado con los mensajes
    })
    socket.on('authenticated',async(data)=>{
        let messages= await messageManager.getMessages();
        socket.emit('messageLogs',messages); //socket emit se envia al usuairo que se acaba de conectar.
        socket.broadcast.emit('newUserConnect',data); //enviamos a todos los usuarios menos al que se acaba de conectar, la conexion del nuevo usuario.
    })
});


//En Terminal ---> node src/app.js Levantar Server
//En Terminal ---> nodemon src/app.js Levantar Server para Soket.io
//Cerrar Server con (CTRL + C)

//CREATE...POST
//READ.....GET
//UPDATE...PUT
//DELETE...DELETE

//Para las rutas no colocar verbos, y usar snake-case ejemplo /producto-rock (el verbo ya esta dado por el tipo de peticion http ej get)
