import express from 'express';
import handlebars from 'express-handlebars';
import {Server} from 'Socket.io';
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import {__dirname, PORT, DB_USER, DB_PASS} from "./utils.js";
//import ProductManager from './dao/manager/productManager.js';
import ProductsManagerDB from './dao/dbManagers/products.manager.js';
import mongoose from 'mongoose'; //conexion a base de datos 
import userRouter from './routes/user.router.js';
import MessagesManager from './dao/dbManagers/messages.manager.js';


const app = express();

//Configuracion para Soporte 

app.use(express.json()); // Permite soportar y recibir formatos JSON (desde el front y el back)
app.use(express.urlencoded({extended: true})); //permite soportar rutas con codigos y caracteres especiales (ejemplo el @ de un gmail)

//Configuracion express-handelbars (Motor de plantilla)
app.engine('handlebars', handlebars.engine()); //engine(), es un método en Express.js que registra un motor de plantilla en la aplicación
app.set('views',`${__dirname}/views`); //indicar donde estan almacenadas nuestras vistas.
app.set('view engine', 'handlebars'); //Configuracion para decirle a express que use handlebars como motor de plantilla.
//views engine se refiere al motor de plantillas que se utilizará 


//Configuracion para agregar funcionalidad de archivos estáticos. (poder usar la carpeta public).
app.use(express.static(`${__dirname}/public`)); //usamos la carpeta public de manera estatica. con path absoluto __dirname.
//esto permite acceder a archivos css,js y cualquier archivo y carpeta dentro de public. Todo lo que esta dentor de public es estatico.


app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/views',viewsRouter);
app.use('/api/users',userRouter);


//Conexion a la Base de datos de mongoos Atlas

try {
    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster39760ap.pxf6a45.mongodb.net/?retryWrites=true&w=majority`);
    console.log('DB Mongoose Connected')
} catch (error) {

    console.log(error)
    
}

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

    const products=await productManager.getProducts()

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