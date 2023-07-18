import passport from 'passport';
import config from './dotenv.config.js'; //DOTENV PARA SESSION
import jwt from 'passport-jwt'
//const LocalStrategy= local.Strategy; //una constante para identificar con que mecanismo de autoenticacion voy a trabajar

const JWTStrategy=jwt.Strategy
const ExtractJWT= jwt.ExtractJwt;//extraer jwt de las cookies

const cookieExtractor=req=>{ //obtenemos la cookie del front que ya fueron seteadas
    let token =null;
    if(req && req.cookies){
        token = req.cookies['eCookieToken']; //cookie que esta en sessions.router
        return token;
    }
    //con esto accedo a las cookies que yo tenia seteadas anteriormente
    //esto es una peticion http asi que puedo acceder a la cookie mediante este metodo
}



const initializePassport =()=>{ //mecanismo de registro y Login - Passport trabaja a manera de un middleware
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), //metodo para extraer de cookies el JWT
        secretOrKey: config.privateKey  //la clave privada debe ser la de utils para que pueda desifralo (ya que lo creamos con ese codigo para sifrar, entonces para desifrar se usa para el proceso inverso)
    }, async (jwt_payload, done) => { //jwt_payload es el jwt ya decifrado es decir que extrajo la info de la cookie
        try {
            // if(!jwt_payload.jkhasdfakshdf) return done(null, false, { messages: 'User not found' })
            return done(null, jwt_payload.user); 
           //aca passport setea el usuario en forma de req.user que es el objeto con los elementos dentro de user
        } catch (error) {
            return done(error);
        }
    }));
   

};

export default initializePassport;

