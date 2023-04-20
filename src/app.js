import express from "express";
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import __dirname from "./utils.js";

const app = express();

//Configuracion para Soporte 

app.use(express.json()); // Permite soportar y recibir formatos JSOn
app.use(express.urlencoded({extended: true})); //permite soportar rutas con codigos y caracteres especiales

// configuracion para uso de carpeta Public
app.use(express.static(`${__dirname}/public`));

//Rutas Servicios
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);

//Server
app.listen(8080, () => console.log('Listening on port 8080'));

//En Terminal ---> node src/app.js Levantar Server