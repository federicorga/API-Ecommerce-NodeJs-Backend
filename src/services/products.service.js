//(2) importamos de config el DAO ya instanciado

import ProductsRepository from '../repositories/products.repository.js';
import {logger} from '../loggers/logger.js';

const productsRepository = new ProductsRepository();
const getAllProducts = async () => {
    const products = await productsRepository.getAllProducts();
    return products;
}

const getAllProductsOrganized = async (limit = 10, page = 1, query = false, sort = false) => {
    if (isNaN(page)) return 'La página especificada no existe';
    const products = await productsRepository.getAllProductsOrganized(limit, page, query, sort);
    if (page > products.totalPages || page <= 0) {
        return 'La página especificada no existe';
    }
    return products;
}

const addOneProduct = async (newProduct) => {
    const codeRepetido = await esCodeRepetido(newProduct.code);
    const checkEmpty = checkEmptyObject(newProduct);
    if (codeRepetido || checkEmpty) {
        logger.warning("producto no agregado");
        return "producto no agregado";
    }
    const product = await productsRepository.addOneProduct(newProduct);
    if (product) logger.info("producto agregado a la lista");
    return product;
};

const updateOneProduct = async (id, product) => {
    const result = await productsRepository.updateOneProduct(id, product);
    return result;
};

const deleteOneProduct = async (id) => {
    const result = await productsRepository.deleteOneProduct(id);
    return result;

};
const getProductById = async (id) => {
    const product = await productsRepository.getProductById(id);
    if (!product) throw new Error("the product not exist.");
    return product;

};

const getAllProductForCategory = async (category) => {   

    const result = await productsRepository.getAllProductForCategory(category);
    return result;

};

const getAllProductForAscDesc = async (ascDes) => {
    const result = await productsRepository.getAllProductForAscDesc(ascDes);
    return result;
};

//---------------------------Auxilares Funciones

const esCodeRepetido = async (code) => {
    // Verifica si el codigo de algunos de los productos de(productos.json) tiene el mismo codigo pasado.
    const products = await this.getAllProducts();

    const codeExiste = products.find(products => products.code === code);


    if (codeExiste) {
        logger.error('error code se repite');
        return true; // se repite
    }

    return false; // no se repite;


};

const checkEmptyObject = (object) => {
    //verifica si el valor de algun elemento del objeto es vacio(indefinido,etc).
    for (const key in object) {
        if (object[key] === "" ||
            object[key] === undefined ||
            object[key] === null ||
            object[key] === false)
            return true; //el objeto posee elementos vacios o falsos.
    }

    return false; //el objeto no posee elemento vacios o falsos.
}



export {
    getAllProducts,
    getAllProductsOrganized,
    addOneProduct,
    updateOneProduct,
    deleteOneProduct,
    getProductById,
    getAllProductForCategory,
    getAllProductForAscDesc
}