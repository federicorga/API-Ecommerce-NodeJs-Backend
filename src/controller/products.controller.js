
//(3) Importamos de Servicios las constantes y le modificamos el nombre para poder usarlas a Service


import * as productsService from '../services/products.service.js'


const getAllProductsOrganized= async (req, res) => {
    try {
        const { limit, sort, page, query } = req.query;
        const respound = await productsService.getAllProductsOrganized(limit, page, query, sort);
        return res.send(respound);
    } catch (error) {
         req.logger.error(error.message);
        res.status(500).send({ status: 'error', message: error.message });
    }

};


//localhost:8080/api/products/(number)
const getProductById = async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await productsService.getProductById(productId);
        product ? res.send(product) : res.send("Producto no encontrado");
    } catch (error) {
         req.logger.error(error.message);
        res.status(500).send({ status: 'error', message: error.message });
    }

};


//CREATED desde Body / Raw
const addOneProduct= async (req, res) => {
    try {
        const producte = req.body;
        const result = await productsService.addOneProduct(producte);
        return res.send({ status: 'success', result: `${result}` });
    } catch (error) {
         req.logger.error(error.message);
        res.status(500).send({ status: 'error', message: error.message });
    }



};


const deleteOneProduct= async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await productsService.getProductById(productId);
        product ? res.send(await productsService.deleteOneProduct(productId)) : res.send("Producto no encontrado");
    } catch (error) {
         req.logger.error(error.message);
        res.status(500).send({ status: 'error', message: error.message });
    }



};

const updateOneProduct = async (req, res) => {
    try {
        const productId = req.params.pid;
        const newProduct = await req.body;
        const result = await productsService.updateOneProduct(productId, newProduct);
        res.send({ status: 'success', result: `${result}` });
    } catch (error) {
         req.logger.error(error.message);
        res.status(500).send({ status: 'error', message: error.message });
    }


};




export {
    getAllProductsOrganized,
    getProductById,
    addOneProduct, 
    deleteOneProduct,
    updateOneProduct 

}

