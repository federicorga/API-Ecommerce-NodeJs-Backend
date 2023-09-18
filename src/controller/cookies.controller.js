

const setCookie = (req, res) => {
    try {
        res.cookie('EcommerceCookie', 'Esta es una cookie seteada', { maxAge: 30000 }).send('Cookie Seteada');

    } catch (error) {
        req.logger.error(error.message);
        res.status(500).send({ status: 'error', message: error.message });
    }

};


const getAllcookies = (req, res) => {
    try {
        res.send(req.cookies);
    } catch (error) {
        req.logger.error(error.message);
        res.status(500).send({ status: 'error', message: error.message });
    }

};

const deleteOneCookie = (req, res) => {
    try {
        const cookie = req.params.cookie;
        res.clearCookie(cookie).send('Cookie removida');
    } catch (error) {
        req.logger.error(error.message);
        res.status(500).send({ status: 'error', message: error.message });
    }

};

const signedCookie = (req, res) => {
    try {
        res.cookie('SignedCookie', 'esta cookie seteada esta firmada',
            { maxAge: 30000, signed: true }).send('cookie firmada exitosamente');

    } catch (error) {
        req.logger.error(error.message);
        res.status(500).send({ status: 'error', message: error.message });
    }

};

const saveSignedCookie = (req, res) => {
    try {
        res.send(req.signedCookies)
    } catch (error) {
        req.logger.error(error.message);
        res.status(500).send({ status: 'error', message: error.message });
    }

};

const addNewCookie = (req, res) => {
    try {
        const data = req.body;
        res.cookie('CoderCookie', data, { maxAge: 1000 }).send({ status: 'succes', message: 'cookie set' });
    } catch (error) {
        req.logger.error(error.message);
        res.status(500).send({ status: 'error', message: error.message });
    }

};


export {
    setCookie,
    getAllcookies,
    deleteOneCookie,
    signedCookie,
    saveSignedCookie,
    addNewCookie

}