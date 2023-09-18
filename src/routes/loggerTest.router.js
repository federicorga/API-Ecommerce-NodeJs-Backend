import { Router } from "express";


const router = Router();



router.get('/', (req, res) => {


    req.logger.fatal('Prueba error');
    req.logger.error('Prueba error')
    req.logger.warn('Prueba warning');
    req.logger.info('Prueba info');
    req.logger.http('Prueba http')
    req.logger.debug('Prueba debug');


});

export default router;