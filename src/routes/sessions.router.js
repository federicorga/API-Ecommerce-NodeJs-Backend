import { Router } from 'express';
import userModel from '../dao/models/users.model.js';
import { createHash, isValidPassword } from '../utils.js';
import passport from 'passport';
const router=Router();




router.post('/register', passport.authenticate('register', {failureRedirect: 'fail-register'}), async (req, res) => {
    res.send({ status: 'success', message: 'User registered' })
});

router.get('/fail-register', async(req,res)=>{ //passport redirige a esta rutra si el registro falla podemos poner cualquiera
    res.send({status:'error', message:'Register failed!'})
})

router.get('/session', (req,res)=>{
    if(req.session.counter){
        req.session.counter++;
        res.send(`se a visitado el sitio ${req.session.counter} veces`)
    }else{
        req.session.counter = 1
        res.send(`Bienvenido`)
    }
});

router.post('/login',passport.authenticate('login', {failureRedirect: 'fail-login'}) ,async (req, res) => {

    /*if(req.session.user.email === 'admin@gmail.com' && req.session.user.password === 'admin') {
        req.session.user = {
           first_name: `Admin`,
           email: email,
          age: 123,
         role: 'admin'
       }

       return res.send({ status: 'success', message: 'Login Admin success' })}*/
    
    if(!req.user) return res.status(400).send({ status: 'error', error: 'Invalid Credentials' });

    req.session.user={
    first_name:req.user.first_name,
    last_name:req.user.last_name,
    age: req.user.age,
    email:req.user.email,
    role:req.user.role
    }
    res.send({ status: 'success', message: 'Login success' })
   
});

router.get('/fail-login', async(req,res)=>{ //passport redirige a esta rutra si el registro falla podemos poner cualquiera
    res.send({status:'error', message:'Login failed!'})
})

    

    /*function auth(req,res,next){
    if(req.session?.user==="admin" && req.session?.admin){ //el ? es que es opcional como que puede o no puede existir
        return next();
    }

    return res.status (401).send('error de autenticación')
};*/
    /* esto era para persistencia ne memoria 
    if(username!=='admin' || password!=='123'){
        return res.send('login failed, Usuario o contraseña incorrecta!');
    };

    req.session.user=username; //le agrego el atributo username a user
    req.session.admin=true; //que este usuario es administrador
    res.send('login exitoso')*/



router.get('/logout', (req,res)=>{
    req.session.destroy(error=>{
        if(error)return res.status(500).send({status: 'error', error:'Logout fail!'});
        
        res.redirect('/views/login'); //con esto redireccionamos a la ruta raiz al finalizar la sesion
    })
});


/*router.get('/private',auth,(req,res)=>{ //middleware de autenticacion auth es autenticacion. me permite validar si el usario esta logeado o no para acceder
res.send('Estas logueado')

});*/


//rutas Github-------
router.get('/github', passport.authenticate(
    'github', { scope: ['user:email'] }
), async (req, res) => {
    res.send({ status: "success", message: "User registered" })
});

router.get('/github-callback', passport.authenticate(
    'github', { failureRedirect: '/login' }
), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/views/profile')
})



export default router;