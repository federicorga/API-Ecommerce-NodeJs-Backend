
import EErrors from './enums.js'

export default (error, req, res, next) => { 
    
        switch (error.code) {
            case EErrors.ROUTING_ERROR:
                res.status(404).send({
                    status: 'error',
                    error: error.name,
                    description: error.cause
                });
                break;
            case EErrors.INVALID_TYPE_ERROR:
                res.status(400).send({
                    status: 'error',
                    error: error.name,
                    description: error.cause
                });
                break;
            case EErrors.USER_NOT_FOUND:
                res.status(404).send({
                    status: 'error',
                    error: error.name,
                    description: error.cause
                });
                break;
            case EErrors.AUTHENTICATION_ERROR:
                res.status(401).send({
                    status: 'error',
                    error: error.name,
                    description: error.cause
                });
                break;
            case EErrors.PERMISSION_DENIED:
                res.status(403).send({
                    status: 'error',
                    error: error.name,
                    description: error.cause
                });
                break;
            case EErrors.FILE_NOT_FOUND:
                res.status(404).send({
                    status: 'error',
                    error: error.name,
                    description: error.cause
                });
                break;
            case EErrors.UNKNOWN_ERROR:
                res.status(500).send({
                    status: 'error',
                    error: error.name,
                    description: error.cause
                });
                break;
            default:
                res.status(500).send({
                    status: 'error',
                    error: error.name,
                    description: error.cause
                });
                break;
        }
        next();
    }