import { Router } from 'express';

import {
    jwtMiddlewareAuthenticate,
    authorizationRole,

} from '../middlewares/passportSessions.middleware.js'


import { getAllUsers, deleteUsers } from '../controller/users.controller.js';

import { routingError } from '../middlewares/errors/routingError.middleware.js';

const router = Router();


router.get('/', jwtMiddlewareAuthenticate, authorizationRole(['admin']), getAllUsers);
router.delete("/", jwtMiddlewareAuthenticate, authorizationRole(['admin']), deleteUsers)

router.use(routingError)

export default router;