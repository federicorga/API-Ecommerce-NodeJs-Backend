export default class UserDto{
  //el DTO permite dar un tratamiento a mi informacion antes de que llegue a nuestra base de datos.
  //permite modificar lo que llega del front a nuestro gusto para meterlo en la BD
  
 
//objeto de entrada
  // name:first_name
  // lastname: last_name

 //objeto de salida
 //fullName: first_name last_name

  constructor(user){ //objeto que va a salir
    this.fullName=`${user.first_name} ${user.last_name}`
  }
}


//debemos llamarlo e instanciarlo y colocarlo antes de el create y enviarlo

/*router.post('/', async (req,res) =>{
  const {name,lastname,phone}=req.body;
  const contact = new ContactDto({name, lastname, photne}) ACA SE INSTANCIA 
  const result = await contacts.create(contact)
  res.json(result)*});*/

  //se usa mucho para transformar por ejemplo al crear el usuario con GITHUB tiene un patron de diseño diferente al nuestro
  //entonces podemos captar la info y modificarla para que se ajuste a nuestro patron de MODELS MONGO