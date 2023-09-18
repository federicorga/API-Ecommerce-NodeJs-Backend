
import { logger } from '../loggers/logger.js';
import dotenvConfig from '../config/dotenv.config.js';



const persistence = dotenvConfig.persistence;
const URL = dotenvConfig.mongoUrl


const { default: ProductsManager } = await import('./dbManagers/classes/products.mongo.js');
const { default: CartsManager } = await import('./dbManagers/classes/cart.mongo.js'); 
const { default: MessagesManager } = await import('./dbManagers/classes/messages.mongo.js'); 
const { default: UserManager } = await import('./dbManagers/classes/user.mongo.js'); 
const { default: TicketsManager } = await import('./dbManagers/classes/tickets.mongo.js');s

let ProductsDAO = ProductsManager;
let CartDAO = CartsManager;
let MessagesDAO = MessagesManager;
let UserDAO = UserManager;
let TicketsDAO = TicketsManager




switch (persistence) {
    case 'MONGO': //Persistencia en base de datos MONGO
        try {
            logger.info('working from BDD MONGO');
            const mongoose = await import('mongoose');
            await mongoose.connect(URL);
            const { default: ProductsManager } = await import('./dbManagers/classes/products.mongo.js');
            const { default: CartsManager } = await import('./dbManagers/classes/cart.mongo.js');
            const { default: MessagesManager } = await import('./dbManagers/classes/messages.mongo.js');
            const { default: UserManager } = await import('./dbManagers/classes/user.mongo.js');
            const { default: TicketsManager } = await import('./dbManagers/classes/tickets.mongo.js')


            ProductsDAO = ProductsManager;
            CartDAO = CartsManager;
            MessagesDAO = MessagesManager;
            UserDAO = UserManager;
            TicketsDAO = TicketsManager;

            logger.info('***Conectado a BDD***');
        } catch (error) {
            logger.error(error);
        }

        break;

    case 'FILE':
        try {
            logger.info('working from files persistence');

            logger.info('***Conectado a FILES***');
        } catch (error) {
            logger.error(error);
        }


}

export {
    ProductsDAO,
    CartDAO,
    MessagesDAO,
    UserDAO,
    TicketsDAO
}