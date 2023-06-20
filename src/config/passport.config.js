import passport from 'passport';
import local from 'passport-local';
import userModel from '../dao/models/users.model.js';
import { createHash, isValidPassword } from '../utils.js';
import GitHubStrategy from 'passport-github2';
import jwt from 'passport-jwt'
const LocalStrategy= local.Strategy; //una constante para identificar con que mecanismo de autoenticacion voy a trabajar

const JWTStrategy=jwt.Strategy
const ExtractJWT= jwt.ExtractJwt;//extraer jwt de las cookies


const initializePassport =()=>{ //mecanismo de registro y Login - Passport trabaja a manera de un middleware

    //se definen los procesos de registro y login
    passport.use('jwt',new JWTStrategy({ //se usa JWT como estrategia
     jwtFromRequest:ExtractJWT.fromExtractors([cookieExtractor]), //metodo para extraer el jwt de la cookie mediante la funcion cookieExtractor
     secretOrKey: 'coder39760' //usamos el codigo de utils ya que con este siframos el jwt
    }, async (jwt_payload, done)=>{ //username es el email y done es un callback, req es lo que se obtiene de passReq
      
        const { first_name, last_name, email, age} = jwt_payload;
        try {
            const exists = await userModel.findOne({ email: username });
            if (exists){
                return done(null, jwt_payload.user); //el usuario ya existe mediante el false y no puede registrarse nuevamente
            } 
            const userToSave = {
                first_name,
                last_name,
                email,
                age,
                password:createHash(password), //se importa de utils esto hashea la contraseña y la guarda en la bd
            };
            const result= await userModel.create(userToSave);
            return done(null,result)
        } catch (error) {
            return done(`Error al obtener el usuario: ${error}`)
        }
    }));

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
    });

};

const cookieExtractor=req=>{
    let token =null;
    if(req && req.cookies){
        token = req.cookies['eCookieToken']; //cookie que esta en sessions.router
        return token;
    }
    //con esto accedo a las cookies que yo tenia seteadas anteriormente
    //esto es una peticion http asi que puedo acceder a la cookie mediante este metodo
}

export default initializePassport;