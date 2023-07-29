import dotenv from 'dotenv';

//import { Command } from "commander";

//const program=new Command();

//Configuracion previa de Ambiente

//program.option('--mode <mode>', 'variable de ambiente');
//program.parse();

//const enviroment=program.opts().mode.toUpperCase()

/*
//con dotenv.config estoy habilitando para que las variables de ambiente sean leiadas del archivo .env (por defecto)
dotenv.config({
    path: enviroment==='DEVELOPMENT'? //modificamos el path para que tome el archivo que nosotros le especificamos
    './.env.development': './.env.production' //toma los valores o de desarrollo o de produccion dependiendo de lo que le pasemos 
});
*/
dotenv.config();

export default {
    port: process.env.PORT,
    persistence: process.env.PERSISTENCE, //persistencia de DAO
    envrioment: process.env.NODE_ENV,
    mongoUrl: process.env.MONGO_URL,
    secretSession: process.env.SECRET_SESSION,
    privateKey: process.env.PRIVATE_KEY,
    privateKeyGithub: process.env.PRIVATE_KEY_GITHUB

}

//no se envia el .env se coloca en .gitignore, el que se envia es el .env.example con descripcionesd