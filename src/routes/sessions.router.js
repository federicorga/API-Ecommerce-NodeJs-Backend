import { Router } from 'express';
import userModel from '../dao/models/users.model.js';
import { authToken, createHash, generateToken, isValidPassword } from '../utils.js';
import passport from 'passport';
const router=Router();




router.post('/register', passport.authenticate('register', {failureRedirect: 'fail-register'}), async (req, res) => {
    const accessToken=generateToken(req.user); //generamos el token al registrar
    res.cookie('eCookieToken',accessToken,{maxAge:60*60*1000, httpOnly:true} //enviamos el accesToken a la cookie del front
    // y esta cookie solo estara valida a travez de una peticion html con httpOnly(le da seguridad)
    ).send({ status: 'success', message: 'User registered', access_token:accessToken })
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

    if(!req.user) return res.status(400).send({ status: 'error', error: 'Invalid Credentials' });


   
    req.session.user={
    first_name:req.user.first_name,
    last_name:req.user.last_name,
    age: req.user.age,
    email:req.user.email,
    cart:req.user.cart,
    role:req.user.role
    }
const accessToken=generateToken(req.session.user); //generamos el token
 res.send({ status: 'success', message: 'Login success', access_token:accessToken })
   
});

router.get('/current',passport.authenticate('register',{session:false}), (req,res)=>{ //trabajamos con un middleware de jwt passport y ponemos el nombre de la estrategia register de config
    //sessions false es porque ya no se trabaja con sesiones
    res.send({status:'success', payload: req.user})
})

router.get('/fail-login', async(req,res)=>{ //passport redirige a esta rutra si el registro falla podemos poner cualquiera
    res.send({status:'error', message:'Login failed!'})
})




router.post('/reset', async(req,res)=>{

    try {
        const {email, password}=req.body;
        if(!email || !password) return res.status(400).send({status:'error', error: 'Incomplete values'});

        const user = await userModel.findOne({email});

        if(!user) return res.send(400).send({status: 'error', error:' user not found'});

        user.password=createHash(password); //hasheamos la nueva contraseña

        await userModel.updateOne({email}, user); //subimos la nueva contraseña hasheada
        
        res.send({status:'success', message:'Password reset!'})
        
    } catch (error) {

        res.status(500).send({status:'error', error:error.message});
        
    }

})

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