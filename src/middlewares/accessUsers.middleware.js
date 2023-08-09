//Acceso Públicos y privados
const publicAccess = (req, res, next) => {
    try {
        if (req.user) return res.redirect('/views/profile');
        next();
    } catch (error) {
        req.logger.error(error.message);
        res.status(500).send({ status: 'error', error: error.message });
    }

};
const privateAccess = (req, res, next) => {
    try {
        if (!req.user) return res.redirect('/views/login');
        next();
    } catch (error) {
        req.logger.error(error.message);
        res.status(500).send({ status: 'error', error: error.message });
    }

};




export{
    publicAccess,
    privateAccess
}