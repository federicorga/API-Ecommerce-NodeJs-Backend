import local from 'passport-local';
import userModel from '../dao/dbManagers/models/users.model.js';
import { createHash, isValidPassword,PRIVATE_KEY, PRIVATE_KEY_GITHUB } from '../utils.js'
import GitHubStrategy from 'passport-github2';



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