import { Router } from 'express';
import userModel from '../dao/models/users.model.js';
import { authToken, createHash, generateToken, isValidPassword } from '../utils.js';
import CartManager from '../dao/dbManagers/carts.manager.js';
import passport from 'passport';
const router=Router();


const cartManager=new CartManager();

router.post('/register', async (req, res) => {

    const { first_name, last_name, email, age,password} = req.body;
    const cart = await cartManager.addNewCart(); //se genera un nuevo carrito para el usuario
    try {
        const exists = await userModel.findOne({ email: email });
        if (exists){
            res.send({status:'error ', error:'user exist'}); //el usuario ya existe mediante el false y no puede registrarse nuevamente
        } 

        const userToSave = {
            first_name,
            last_name,
            email,
            age,
            cart,
            password:createHash(password), //se importa de utils esto hashea la contraseña y la guarda en la bd
        };

        const result= await userModel.create(userToSave);

        const accessToken=generateToken(result); //generamos el token al registrar
      res.send({ status: 'success', message: 'User registered', access_token:accessToken })

    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error: error.message });
    }
    
   
});


router.get('/session', (req,res)=>{
    if(req.session.counter){
        req.session.counter++;
        res.send(`se a visitado el sitio ${req.session.counter} veces`)
    }else{
        req.session.counter = 1
        res.send(`Bienvenido`)
    }
});

router.post('/login',async (req, res) => {

    const{email,password}=req.body;
   

    try {
        const user = await userModel.findOne({ email:email }); //busco en la BD
        
        if (!user) return res.status(400).send({ status: 'error', error: 'Invalid credentials' });


        if(!isValidPassword(user,password))return res.status(400).send({status: 'error', error: 'Invalid password' });//verifica si las contraseñas coinicden

        const userFind = {
            first_name:user.first_name,
            last_name:user.last_name,
            age:user.age,
            email:user.email,
            role:user.role,
            cart:user.cart
          };

        //si el login se hace de manera exitosa va a setear el req.User

        const accessToken=generateToken(userFind); //generamos el token
res.cookie('eCookieToken',accessToken,{maxAge:60*60*1000, httpOnly:false} //enviamos el accesToken a la cookie del front
// y esta cookie solo estara valida a travez de una peticion html con httpOnly(le da seguridad)
).send({ status: 'success'})

    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    }
   
});

router.get('/current',passport.authenticate('jwt',{session:false}), (req,res)=>{ //trabajamos con un middleware de jwt passport y ponemos el nombre de la estrategia register de config
    //sessions false es porque ya no se trabaja con session
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