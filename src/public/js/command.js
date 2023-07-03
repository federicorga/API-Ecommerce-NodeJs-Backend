import { Command } from "commander";

const program=new Command();

//en program option el plaso la flag ejemplo (--)
//segundo parametro es la descripcion
//le podemos pasar un atributo por defect (en este caso si no llega flag -d envia false)
program.option('-d','variable para debug',false)
//<> lo que esta entre llaves puede ser cualquier nombre
//si es un solo caracter para el nombre del flag es un - en cambio si tiene mas caracteres como mode se usa  -- doble
.option('-p <port>', 'puerto el servidor', 8080)
.option('--mode <mode>','modo de trabajo', 'production')
.requiredOption('-u <user>', 'usuario del sistema') //este parametro no es opcional si no que es obligatorio

//que esos argumentos que paso como parametros se transforme a un objeto
program.parse();

//console.log('options:', program.opts());
//console.log('Arguments:', program.args);

/*si ejecuto node command.js sin enviar ningun parametro obligatorio en user me devuelve esto
error: required option '-u <user>' not specified
 si envio un -u por ejemplo node command.js -u root devuelve esto:
options: { d: false, p: 8080, mode: 'production', u: 'root' }
Arguments: []

esto sirve para enviar dinamicamente parametros al momento de ejecutar y por ejemplo especificarle en que ambiente de entorno deseo que se ejecute
tambien a app.liste() le puedo enviar desde la consola el puerto y no tenerlo quemado en le codigo.
Ejemplo:
app.listen(program.opts().p)
en la consola ejemplo node comand.js -p 8080
sin embargo enviara un string por lo que tengo que parsearlo a numero
*/
