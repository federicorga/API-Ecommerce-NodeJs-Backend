//Mongoose me permite hacerMapeo de el objeto que voy a estar trabajando a nivel de codigo 
//con la estructura que voy a tener en nuestra base de datos, es decir a nuestra coleccion y nuestros documentos que vamos a ir almacentando
//en esa coleccion.

//La capa mas baja es la persistencia de datos 

import mongoose from "mongoose";


const userCollection= 'users' //nombre de nuestra coleccion. tambien llamado Esquema

//definimos la estructura de la coleccion.

/*{
    first_name:'fede',
    last_name:'garea',
    email:'fede@gmail.com'
}*/

//Modelo o estructura de nuestra coleccion es decir que definimos su forma.
const userSchema =new mongoose.Schema({ //se genera un ID de forma automatica al crearse este registro.
    first_name: {type:String,
    required:true},
    last_name: {type:String,
        required:true},
    email: {
        type:String,
        unique: true, // no pueden haber 2 usuarios con el mismo email.
        required:true, // que el campo sea si o si requerido
    },
    age:{type:String,
    required:true},
    password:{type:String},
    cart:{type:mongoose.Schema.Types.ObjectId, ref:"carts"},
    role:{type:Boolean,
    default:false}
});

const userModel = mongoose.model(userCollection, userSchema); //Esquema y modelo (parte funcional).
//al exportar se crea el modelo para poder trabajar.
export default userModel;
