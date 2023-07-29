import { productModel } from "../models/products.models.js"
import {logger} from "../../../loggers/logger.js";

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
        const result = await productModel.create(newProduct); //archivo Json enviarlo a Mongoos
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
        const product = await productModel.findOne({ _id: id }, { __v: 0 }).lean(); // con Lean obtenemos  objetos JavaScript en lugar de documentos Mongoose
        return product;
    };

    getAllProductForCategory = async (category) => {
        //devuelve campo por categoria
        let products = await productModel.aggregate([
            { $match: { category: category } } //una forma otra  es
            //{$category: {_id:'$category', products:{$push:'$$ROOT'}}} //esta forma separa todo en categorias
        ]);
        return products
    };

    getAllProductForAscDesc = async (ascDes) => {
        // Orden ascendente por el campo "price" ascDes= 1 de menor a mayor
        // Orden descendente por el campo "price" ascDes= -1 de mayor a menor
        let products = await productModel.aggregate([
            {
                $sort: { price: ascDes }
            }
        ]);
        return products;
    };

};

