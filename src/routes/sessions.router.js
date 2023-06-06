import { Router } from 'express';
import userModel from '../dao/models/users.model.js';

const router=Router();




router.post('/register', async (req, res) => {
    
    const { first_name, last_name, email, age, password} = req.body;
    const exists = await userModel.findOne({ email });
    try {
    
        if (exists) return res.status(400).send({ status: 'error', error: 'User already exists' });

        const user = {
            first_name,
            last_name,
            email,
            age,
            password,
        };

        await userModel.create(user);
        res.send({ status: 'success', message: 'User registered' })
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    };
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

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

         if(email === 'admin@gmail.com' && password === 'admin') {
             req.session.user = {
                name: `Admin`,
                email: email,
               age: 123,
              role: 'admin'
            }

            return res.send({ status: 'success', message: 'Login Admin success' })
         }

        const user = await userModel.findOne({ email, password }); //busco en la BD

        if (!user) return res.status(400).send({ status: 'error', error: 'Incorrect credentials' });

        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age
        }

        res.send({ status: 'success', message: 'Login success' })
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});

    

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


export default router;