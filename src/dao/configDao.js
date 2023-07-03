//(1) Importamos de los Manager a config, luego instanciamos las clases de los manager

import mongoProductsDao from './dbManagers/products.dao.js';
import mongoCartDao from './dbManagers/cart.dao.js';
import mongoMessagesDao from './dbManagers/messages.dao.js';
import mongoUserDao from './dbManagers/user.dao.js';


// Creo la instancia de manejo de datos con BD MONGOO
const MongoProductsDao = new mongoProductsDao();
const MongoCartDao = new mongoCartDao(); 
const MongoMessagesDao = new mongoMessagesDao();
const MongoUserDao = new mongoUserDao();


// export const PRODUCTSDAO =config.persistence === 'MEMORY' ? MemoryProductsDao : MongoProductsDao; Ejemplo para cambio a fileManager


export const PRODUCTSDAO = MongoProductsDao;
export const CARTDAO = MongoCartDao;
export const MessagesDAO = MongoMessagesDao;
export const UserDAO= MongoUserDao;
