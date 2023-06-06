import { Router } from 'express';

const router=Router();


router.get('/set-cookie',(req,res)=>{ //seteamos la cookie 
    res.cookie('EcommerceCookie', 'Esta es una cookie seteada',{maxAge: 30000}).send('Cookie Seteada');
    //Utilizando el objeto res para enviar la cookie al cliente mediante res.cookie
    //res. cookie tiene 3 parametros (clave = EcommerceCookie, Valor= el string que se ve, Tiempo de cookie = en milisegundos)
    //Si no colocamos el parámetro maxAge, la cookie persistirá hasta ser borrada (sin tiempo de vida definido).
    //la cookie la podemos ver en el navegador en application cookies
});


router.get('/', (req,res)=>{
    res.send(req.cookies); // con esto obtenemos el listado de todas las cookies que tenemos almacenadas hasta el momento (no firmadas)
});

router.get('/delete-cookie/:cookie',(req,res)=>{
    const cookie= req.params.cookie;
    res.clearCookie(cookie).send('Cookie removida'); //tenemos que pasar el valor de la cookie que queremos limpiar
});

router.get('/set-signed-cookie', (req,res)=>{
    res.cookie('SignedCookie', 'esta cookie seteada esta firmada',
    {maxAge:30000, signed:true}).send('cookie firmada exitosamente'); //signed true significa que esta firmada
    //las cookies firmadas se guardan en otro lugar 
    //esto permite invalidar si la cookie fue  modificada como invalid cookie
});

router.get('/signed-cookie', (req,res)=>{
    res.send(req.signedCookies) //se almacenan aca las cookies firmadas
});

router.post('/', (req,res)=>{
    const data= req.body;
    res.cookie('CoderCookie', data, {maxAge:1000}).send({status:'succes', message:'cookie set'});
})

export default router