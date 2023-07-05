import express from 'express';
import handlebars from 'express-handlebars';
import {Server} from 'Socket.io';
import './dao/dbManagers/dbConfig.js' //conecta a la base de dato con solo colocarlo
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import {__dirname, PORT} from "./utils.js";
import mongoose from 'mongoose';
import ProductsManagerDB from './dao/dbManagers/products.dao.js';
//import userRouter from './routes/users.router.js' //fuera de uso, se usa session
import MessagesManager from './dao/dbManagers/messages.dao.js';
import cookieParser from 'cookie-parser'; // el cookie es como un middleware
import userCookies from './routes/cookies.router.js';
import session from 'express-session'; //para crear usuario e inicio de sesion 
import sessionsRouter from './routes/sessions.router.js';
//import FileStore from 'session-file-store'; //permite guardar sesiones en archivos
import MongoStore from 'connect-mongo'; //mongo para conectar los usuarios en mongo
import initializePassport from './config/passport.config.js';
import passport from 'passport';
import config from './config/dotenv.config.js';


//const fileStorage=FileStore(session); //le pasamos como parametro la session de express

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


//usamos session con MONGODB

app.use(session({
    store: MongoStore.create({
       client: mongoose.connection.getClient(), //reutilizo la coneccion que especifique arriba para no volver a hacer 2 conexiones
        ttl: 3600 //tiempo de expiracion 3600 segundos
    }),
secret:config.secretSession,
resave:true,
saveUninitialized:true
}));
//-------------------





/*Sesiones usando file Storage
app.use(session({ //sesion store es donde se va a almacenar los usarios, si no le pongo usa por defecto el almacenamiento en memoria
    store: new fileStorage({path: `${__dirname}/sessions`, ttl: 30, retries:0}), //ttl es el tiempo de expiracion, retries es los reintentos
    secret: 'admin1234',
    resave: true, //en el caso de que no tengamos actividad, nos de mas tiempo de vida y se este autoguardando.
    saveUninitialized: true, // a pesar de que no iniciemos sesion va a crear un objeto en donde vamos a almacenar los datos de la sesion que iniciemos despues.
}));*/




//PASSPORT Se inicializa en app a nivel global debe ir debajo de Session
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
//------------------------------


app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/views',viewsRouter);
//app.use('/api/users',userRouter); se usa sessions
app.use('/api/cookies',userCookies);
app.use('/api/sessions', sessionsRouter);



//Levantando Server con Socket.io

const httpServer= app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`)); //Server http

const socketServer= new Server(httpServer); //server Socket.io


//handshake ( saludo de manos, servidor ligado).
socketServer.on('connection', async socket=>{
    console.log("Nuevo cliente conectado") //cuando abro una nueva pestaña del navegador deberia mostrarse lo que esta dentro de esta conexion.
    socket.on('message', data=>{ //lee el evento del frontend llamado mensaje y lo muestra.
        console.log(data)
    });




    const productManager = new ProductsManagerDB()

    const products=await productManager.getAllProducts()

    socketServer.emit('real_time_products', {products:products});

    const messageManager=new MessagesManager();

    socket.on('message',async (data)=>{ //recibo mensaje de usuario recibo datos por eso data
        
         await messageManager.save(data)//guardo esos mensajes datos en el array

         let messages= await messageManager.getAll();

         socketServer.emit('messageLogs', messages); // envio un mensajea todos mis usuarios con el array modificado con los mensajes
    })

    socket.on('authenticated',async(data)=>{
        let messages= await messageManager.getAll();
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

//el navegador por defecto siempre hace peticiones de tipo Get
// ahora se van a crear servicios que no son de tipo get (post,put,delete)