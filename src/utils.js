import { fileURLToPath } from 'url'; //Modulo de NodeJs
import { dirname } from 'path'; //Path absoluto Modulo de NodeJS
import bcrypt from 'bcrypt' //dependencia para hashear la contraseña (encriptarla)
import jwt from 'jsonwebtoken'; // dependencia de JWT para json web token



const PORT = 8080;
const DB_USER = "fedeex22"; //usario Mongo
const DB_PASS = "Mongo1234568"; //contraseña Mongo
const __filename = fileURLToPath(import.meta.url); //cuando trabajamos con Path la convencion es con __ doble ej: __filename
const __dirname = dirname(__filename); //Path absoluto


export { __dirname, PORT, DB_USER, DB_PASS };

//metodos de encriptado/Hasheo

//hasheo vs Cifrado (hasheo significa que no podemos revertir o hacer el proceso inverso, con el cifrado podemos hacer el proceso inverso con la palabra secreta)

export const createHash= password=> bcrypt.hashSync(password,bcrypt.genSaltSync(10)); //hasheamos nuestro password que recibimos como parametro y segundo parametro
//es el algoritmo (es decir la cadena de texto) mientra mas rondas tenga mas segura la contraseña:bcrypt.genSaltSync(10) son 10 palabras
export const isValidPassword=(user, password)=>bcrypt.compareSync(password,user.password);
//el primer password es el que llega del login y el segundo user.password es el que ya esta hasheado y se comparan.
//con esto validamos la contraseña


//JWS----- Proxima entrega sin temrinar...

const PRIVATE_KEY = 'coder39760'; //clave privada de JWT

export const generateToken = (user) => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' }); //.sign genera el jwt y dentro de el se enveve el user, el segundo es la clave privada de cifrado de los datos
    // y expiresIn es el tiempo de expiracion 
    return token; //se retorna el token generado
};

export const authToken = (req, res, next) => { //Midellware de autenticacion de token
    const authToken = req.headers.authorization; //nos llega el token de acceso desde el front con la palabra bearer
    
    if(!authToken) return res.status(401).send({error: 'Not authenticated'});// si no llega o el front no lo enia

    const token = authToken.split(' ')[1]; //extrae el token y le quita la palabra bearer
    // el 1 es porque bearer va a estar en la posicion 0 y el codigo token en la posicion 1

    jwt.verify(token, PRIVATE_KEY, (error, credentials) => { // verifica el token (credentials es el token)
        if (error) return res.status(403).send({error: 'Not authorized'}); //en caso de haber un error con la credencial/token
        req.user = credentials.user; //en caso de ser valido se envia envevido la credencial con la extension usuario (todo simila a passport)
        next();
    })
};