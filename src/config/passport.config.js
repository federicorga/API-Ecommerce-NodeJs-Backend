import passport from 'passport';
import local from 'passport-local';
import userModel from '../dao/dbManagers/models/users.model.js';
import { createHash, isValidPassword,PRIVATE_KEY, PRIVATE_KEY_GITHUB } from '../utils.js';
import GitHubStrategy from 'passport-github2';
import jwt from 'passport-jwt'
//const LocalStrategy= local.Strategy; //una constante para identificar con que mecanismo de autoenticacion voy a trabajar

const JWTStrategy=jwt.Strategy
const ExtractJWT= jwt.ExtractJwt;//extraer jwt de las cookies


const initializePassport =()=>{ //mecanismo de registro y Login - Passport trabaja a manera de un middleware
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), //metodo para extraer de cookies el JWT
        secretOrKey: PRIVATE_KEY //la clave privada debe ser la de utils para que pueda desifralo (ya que lo creamos con ese codigo para sifrar, entonces para desifrar se usa para el proceso inverso)
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

// ! PASSPORT-GITHUB

passport.use('github', new GitHubStrategy({
    clientID: "Iv1.022083e07abd1583",
    clientSecret: PRIVATE_KEY_GITHUB,
    callbackURL: "http://localhost:8080/api/sessions/github-callback",
    scope: ['user:email'] // para obtener el email de github publico
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile);
        const email = profile.emails[0].value; //email extraido de github
        const name= profile.displayName; //nombre extraido de github
        const user = await userModel.findOne({ email })
        if (!user) {
            const newUser = {
                first_name: name,
                last_name: 'GitHub User',
                age: 1111,
                email,
                cart,

            }
            const result = await userModel.create(newUser);
            done(null, result);
        } else {
            done(null, user);
        }
    } catch (error) {
        return done(error);
    }
}));

const cookieExtractor=req=>{ //obtenemos la cookie del front que ya fueron seteadas
    let token =null;
    if(req && req.cookies){
        token = req.cookies['eCookieToken']; //cookie que esta en sessions.router
        return token;
    }
    //con esto accedo a las cookies que yo tenia seteadas anteriormente
    //esto es una peticion http asi que puedo acceder a la cookie mediante este metodo
}

export default initializePassport;





//Ejemplo de lo que esta en jwt_payload.user
// ya esta desifrada la cookie 
/*{
  "user": {
    "first_name": "fede",
    "last_name": "sd",
    "age": "12",
    "email": "fe@hotmail.com",
    "role": false
  },
  "iat": 1687325461,
  "exp": 1687411861
}*/




/* Uso de passport

 

    passport.use('login',new LocalStrategy({ //se pasa la estrategia local LocalStrategy y el passport se llama login que se usara en el router
        usernameField:'email'
    }, async (username, password, done)=>{ //username es el email y done es un callback, req es lo que se obtiene de passReq
        
        try {
            const user = await userModel.findOne({ email:username }); //busco en la BD
            if (!user){
                return done(null, false); //el usuario ya existe mediante el false y no puede registrarse nuevamente
            } 

            if(!isValidPassword(user,password))return done(null,false); //verifica si las contraseñas coinicden

            return done(null,user);

            //si el login se hace de manera exitosa va a setear el req.User

        } catch (error) {
            return done(`Error al obtener el usario: ${error}`)
        }
    })); 

  // ! PASSPORT-GITHUB

    passport.use('github', new GitHubStrategy({
        clientID: "Iv1.9ff97a44377b9ade",
        clientSecret: "52241ef21e5415206c9009dd25d3666e381fda25",
        callbackURL: "http://localhost:8080/api/sessions/github-callback",
        scope: ['user:email'] // para obtener el email de github publico
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            const email = profile.emails[0].value; //email extraido de github
            const name= profile.displayName; //nombre extraido de github
            const user = await userModel.findOne({ email })
            if (!user) {
                const newUser = {
                    first_name: name,
                    last_name: 'GitHub User',
                    age: 1111,
                    email,
    
                }

                const result = await userModel.create(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }));


 // ! PASSPORT USER SERIALIZE-DESERIALIZE.
    //metodos para obtener los datos

    passport.serializeUser((user,done)=>{done(null,user._id)}); //almacena el identifiacor con el que inicio el usuario (almacena el id);
    
    passport.deserializeUser(async(id,done)=>{ //busca el usuario y lo deserializa con le id
        const user = await userModel.findById(id); 
        done(null,user);
    });*/