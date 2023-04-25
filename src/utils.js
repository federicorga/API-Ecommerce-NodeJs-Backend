import { fileURLToPath } from 'url'; //Modulo de NodeJs
import { dirname } from 'path'; //Path absoluto Modulo de NodeJS


const __filename = fileURLToPath(import.meta.url); //cuando trabajamos con Path la convencion es con __ doble ej: __filename
const __dirname = dirname(__filename); //Path absoluto


export default __dirname;
  
