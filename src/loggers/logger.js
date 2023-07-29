//debug, http, info, warning, error, fatal

import winston from "winston";
import config from '../config/dotenv.config.js'

const ENVRIOMENT = config.envrioment;

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'orange',
        debug: 'blue'
    }
}


let logger;

if (ENVRIOMENT === 'development') {

    logger = winston.createLogger({
        level: customLevelOptions.levels,
        transports: [
            new winston.transports.Console({
                level: 'debug', //trabajo desde el nive que especifique el resto sera ignorado
                format: winston.format.combine(
                    winston.format.colorize({
                        all: true,
                        color: customLevelOptions.colors
                    }),

                    winston.format.simple()
                )
            }),
            new winston.transports.File({
                filename: 'src/loggers/logs/dev.log',
                level: 'warn'
            })
        ]
    });

} if (ENVRIOMENT === 'production') {

    logger = winston.createLogger({
        level: customLevelOptions.levels,
        transports: [
            new winston.transports.Console({
                level: 'info',
                format: winston.format.combine(
                    winston.format.colorize({
                        all: true,
                        color: customLevelOptions.colors
                    }),
                    winston.format.simple()
                )
            }),
            new winston.transports.File({
                filename: 'src/loggers/logs/prod.log',
                
                level: 'warn'
            })
        ]
    });

}


const addLogger = (req, res, next) => { //middleware de loger y se setea en app.js de manera global
    req.logger = logger;
    req.logger.http(`${req.method} es ${req.url} - ${new Date().toISOString()}`) //se define el nivel http de manera general
    next();
}

export {
    logger,
    addLogger
};
