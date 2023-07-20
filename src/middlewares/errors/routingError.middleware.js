
import CustomError from './CustomError.js';
import EErrors from './enums.js';
import { routerErrorInfo } from './info.js';

const routingError=((req, res, next) => { //error de ruta lo exporto como middleware
    const error = CustomError.createError({
        name: 'RoutingError',
        cause: routerErrorInfo(),
        code: EErrors.ROUTING_ERROR,
    });

    next(error);
});


export{
    routingError
}

