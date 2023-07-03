
//(3) Importamos de Servicios las constantes y le modificamos el nombre para poder usarlas a Service

import {
    getProductsOrganized as getProductsOrganizedService,
    getProductId as getProductIdService,
    addProducts as addProductsService,
    updateProduct as updateProductService,
    deleteProduct as deleteProductService,
    getProductsForCategory as getAllProductForCategoryService,
    getProductForAscDesc as getAllProductForAscDescService
} from '../services/products.service.js'



const getProducts = async (req, res) => {
    try {
        const { limit, sort, page, query } = req.query;

        const respound = await getProductsOrganizedService(limit, page, query, sort);

        return res.send(respound);

    } catch (error) {
        res.send(500).send({ status: 'error', error });
    }

};


//localhost:8080/api/products/(number)
const getProductId = async (req, res) => {
    const productId = req.params.pid;
    const product = await getProductIdService(productId);

    product ? res.send(product) : res.send("Producto no encontrado");
};


//CREATED desde Body / Raw
const addProducts = async (req, res) => {
    const producte = req.body;
    const result = await addProductsService(producte);
    return res.send({ status: 'success', result: `${result}` });


};


const deleteProductId = async (req, res) => {
    const productId = req.params.pid;

    const product = await getProductIdService(productId);

    product ? res.send(await deleteProductService(productId)) : res.send("Producto no encontrado");


};

const updateProductId = async (req, res) => {

    const productId = req.params.pid;

    const newProduct = await req.body;

    const result = await updateProductService(productId, newProduct);


    res.send({ status: 'success', result: `${result}` });

};




export {
    getProducts,
    getProductId,
    addProducts,
    deleteProductId,
    updateProductId
}

