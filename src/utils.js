import { fileURLToPath } from 'url'; //Modulo de NodeJs
import { dirname } from 'path'; //Path absoluto Modulo de NodeJS

const PORT = 8080;
const DB_USER = "fedeex22"; //usario Mongo
const DB_PASS = "Mongo1234568"; //contraseña Mongo
const __filename = fileURLToPath(import.meta.url); //cuando trabajamos con Path la convencion es con __ doble ej: __filename
const __dirname = dirname(__filename); //Path absoluto




export { __dirname, PORT, DB_USER, DB_PASS };
  
