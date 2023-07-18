//esta fabrica se va a encargar de devolver la conexion que solicitamos ya sea a mongos, file, o memory
// se debe pasar la persistencia que se quiere usar

import dotenvConfig from '../config/dotenv.config.js';



const persistence = dotenvConfig.persistence;
const URL = dotenvConfig.mongoUrl


const { default: ProductsManager } = await import('./dbManagers/classes/products.mongo.js'); //conexion a producto
const { default: CartsManager } = await import('./dbManagers/classes/cart.mongo.js'); //conexion a carrito
const { default: MessagesManager } = await import('./dbManagers/classes/messages.mongo.js'); //conexion a mensaje
const { default: UserManager } = await import('./dbManagers/classes/user.mongo.js'); //conexion a usuario
const {default: TicketsManager} = await import('./dbManagers/classes/tickets.mongo.js') //conexion a Ticket

let ProductsDAO = ProductsManager;
let CartDAO = CartsManager;
let MessagesDAO = MessagesManager;
let UserDAO = UserManager;
let TicketsDAO=TicketsManager




switch (persistence) {
    case 'MONGO': //Persistencia en base de datos MONGO
        try {
            console.log('working from BDD MONGO');
            const mongoose = await import('mongoose'); //importamos mongoose dentro del case
            await mongoose.connect(URL); //conexion a la base de datos de MONGO
            const { default: ProductsManager } = await import('./dbManagers/classes/products.mongo.js'); //conexion a producto
            const { default: CartsManager } = await import('./dbManagers/classes/cart.mongo.js'); //conexion a carrito
            const { default: MessagesManager } = await import('./dbManagers/classes/messages.mongo.js'); //conexion a mensaje
            const { default: UserManager } = await import('./dbManagers/classes/user.mongo.js'); //conexion a usuario
            const {default: TicketsManager} = await import('./dbManagers/classes/tickets.mongo.js') //conexion a Ticket


            ProductsDAO = ProductsManager;
            CartDAO = CartsManager;
            MessagesDAO = MessagesManager;
            UserDAO = UserManager;
            TicketsDAO = TicketsManager;

            console.log('***Conectado a BDD***');
        } catch (error) {
            console.log(error);
        }
        /*
        const DB_USER = "fedeex22"; //usario Mongo
       const DB_PASS = "Mongo1234568"; //contraseña Mongo*/
        break;

    case 'FILE': //Persistencia en archivos json
    try {
        console.log('working from files persistence');

        console.log('***Conectado a FILES***');
    } catch (error) {
        console.log(error);
    }
       

}

export {
    ProductsDAO,
    CartDAO,
    MessagesDAO,
    UserDAO,
    TicketsDAO
}