//CONFIGURACION PARA SOPORTE
import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

import { __dirname, PORT } from './utils.js';
import cookieParser from 'cookie-parser';
//PASSPORT
import initializePassport from './config/passport.config.js';
import passport from 'passport';

//Compressor
import compression from 'express-compression';
//ROUTERS
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import userCookies from './routes/cookies.router.js';
import sessionsRouter from './routes/sessions.router.js';
import loggerTestRouter from './routes/loggerTest.router.js';
import usersRouter from './routes/users.router.js'
//MOKING ROUTER
import mokingRouter from './routes/moking.router.js'
//MANAGER PARA SOCKET
import ProductsManagerDB from './dao/dbManagers/classes/products.mongo.js';
import MessagesManager from './dao/dbManagers/classes/messages.mongo.js';
//SESSION
import session from 'express-session';
import dotenvConfig from './config/dotenv.config.js';
//MONGOO
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
//ERRORS
import errorHandler from './middlewares/errors/errors.middleware.js';
//LOGGERS
import { addLogger } from './loggers/logger.js';
import { logger } from './loggers/logger.js';
//SWAGGER
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());


app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(session({
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        ttl: 3600
    }),
    secret: dotenvConfig.secretSession,
    resave: true,
    saveUninitialized: true
}));


initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(compression({
    brotli: { enable: true, zlib: {} }

}));

app.use(addLogger)

//RUTAS
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/users', usersRouter);
app.use('/views', viewsRouter);
app.use('/api/cookies', userCookies);
app.use('/api/sessions', sessionsRouter);
app.use('/moking-products', mokingRouter)
app.use('/loggerTest', loggerTestRouter)

//ERRORES MIddleware Global
app.use(errorHandler);

//Levantando Server
const httpServer = app.listen(PORT, () => logger.info(`Server running on port http://localhost:${PORT}`));
const socketServer = new Server(httpServer);

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación del proyecto E-commerce venta de entradas',
            description: 'API pensada para la venta de entradas de recitales'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

socketServer.on('connection', async socket => {
    logger.info("Nuevo cliente conectado")
    socket.on('message', data => {

    });
    const productManager = new ProductsManagerDB()
    const products = await productManager.getAllProducts()
    socketServer.emit('real_time_products', { products: products });
    const messageManager = new MessagesManager();

    socket.on('message', async (data) => {
        await messageManager.saveMessage(data)
        let messages = await messageManager.getMessages();
        socketServer.emit('messageLogs', messages);
    })
    socket.on('authenticated', async (data) => {
        let messages = await messageManager.getMessages();
        socket.emit('messageLogs', messages);
        socket.broadcast.emit('newUserConnect', data);
    })
});

//En Terminal ---> node src/app.js Levantar Server
//En Terminal ---> nodemon src/app.js Levantar Server para Soket.io
//Cerrar Server con (CTRL + C)

