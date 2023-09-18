import { productModel } from "../models/products.models.js"
import { logger } from "../../../loggers/logger.js";

export default class ProductsManager {
    constructor() {
        logger.info("working products with DB")
    }

    getAllProducts = async () => {

        const products = await productModel.find();
        products.map(product => product.toObject());
        return products
    };

    getAllProductsOrganized = async (queryObj, options) => {

        const products = await productModel.paginate(queryObj, options);
        return products;

    };

    addOneProduct = async (newProduct) => {
        const result = await productModel.create(newProduct);
        return result;
    };

    updateOneProduct = async (id, product) => {
        const result = await productModel.updateOne({ _id: id }, product);
        return result
    };

    deleteOneProduct = async (id) => {
        const result = await productModel.deleteOne({ _id: id });
        return result

    };
    getProductById = async (id) => {
        const product = await productModel.findOne({ _id: id }, { __v: 0 }).lean();
        return product;
    };

    getAllProductForCategory = async (category) => {

        let products = await productModel.aggregate([
            { $match: { category: category } }
        ]);
        return products
    };

    getAllProductForAscDesc = async (ascDes) => {

        let products = await productModel.aggregate([
            {
                $sort: { price: ascDes }
            }
        ]);
        return products;
    };

};

