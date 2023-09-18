
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
                level: 'debug',
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


const addLogger = (req, res, next) => {
    req.logger = logger;

    next();
}

export {
    logger,
    addLogger
};
