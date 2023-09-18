import passport from 'passport';
import config from './dotenv.config.js'; 
import jwt from 'passport-jwt'


const JWTStrategy=jwt.Strategy
const ExtractJWT= jwt.ExtractJwt;

const cookieExtractor=req=>{ 
    let token =null;
    if(req && req.cookies){
        token = req.cookies['eCookieToken'];
        return token;
    }
    
}
const initializePassport =()=>{ 
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), 
        secretOrKey: config.privateKey  
    }, async (jwt_payload, done) => {
        try {
          
            return done(null, jwt_payload.user); 
           
        } catch (error) {
            return done(error);
        }
    }));
   

};

export default initializePassport;

