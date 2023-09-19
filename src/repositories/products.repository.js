import { ProductsDAO } from "../dao/factory.js";

export default class ProductsRepository {
    constructor() { 
        this.dao = ProductsDAO;
    }

    getAllProducts = async () => {
        const products = await this.dao.getAllProducts();
        return products;
    }

    getAllProductsOrganized = async (limit, page, query, sort) => { //enviar a DTO
        const options = {
            lean: true,
            limit: limit || 10,
            page,
        };
        if (sort) options.sort = { price: sort }; 
       
        const queryObj = query ? { category: { $regex: query, $options: 'i' } } : {}; 
      
        const products = await this.dao.getAllProductsOrganized(queryObj, options);
        return products;
    }

    addOneProduct = async (newProduct) => {
        const product = await this.dao.addOneProduct(newProduct);
        return product;
    };

    updateOneProduct = async (id, product) => {

        const result = await this.dao.updateOneProduct(id, product);
        return result;
    };

    deleteOneProduct = async (id) => {
        const result = await this.dao.deleteOneProduct(id);
        return result;

    };
    getProductById = async (id) => {
        const product = await this.dao.getProductById(id);
        return product;

    };

    getAllProductForCategory = async (category) => {

        const result = await this.dao.getAllProductForCategory(category);
        return result;

    };

    getAllProductForAscDesc = async (ascDes) => {
        const result = await this.dao.getAllProductForAscDesc(ascDes);
        return result;
    };

}