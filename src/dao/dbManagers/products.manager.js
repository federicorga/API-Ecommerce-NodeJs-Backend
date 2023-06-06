import { productModel } from "../models/products.models.js";


export default class ProductsManagerDB {
    constructor() {
        console.log("working products whit DB")
    }

    getProducts = async () => {

        const products = await productModel.find();
        return products.map(product => product.toObject());
    };

    getProductsOrganized = async (limit = 10, page = 1, query = false, sort = false) => {

        if (isNaN(page)) {
            return 'La página especificada no existe' ;
          }

          const options = {
            lean: true,
            limit: limit || 10,
            page,
          };
        
          if (sort)options.sort = { price: sort }; //ascendente o descendente 1=desdendente -1(ascendente)
          //http://localhost:8080/views?sort=1
        
          const queryObj = query ? { category: { $regex: query, $options: 'i' } } : {}; // envio el objeto o vacio de query para filtrar
          // http://localhost:8080/views?query=rock
          const products = await productModel.paginate(queryObj, options);

          if (page > products.totalPages || page <= 0) {
            return 'La página especificada no existe' ;
          }
        
        
          return products;

    };

    addProducts = async (product) => {


        const codeRepetido = await this.esCodeRepetido(product.code);
        console.log(product);

        const checkEmpty = this.checkEmptyObject(product);

        if (codeRepetido || checkEmpty) {
            console.log("producto no agregado");
            return "producto no agregado";
        }
        const result = await productModel.create(product); //archivo Json enviarlo a Mongoos

        console.log("producto agregado a la lista");
        return result;
    };

    updateProduct = async (id, product) => {

        const result = await productModel.updateOne({ _id: id }, product);
        return result
    };

    deleteProduct = async (id) => {
        const result = await productModel.deleteOne({ _id: id });
        return result

    };
    getProductById = async (id) => {
        try {

            const product = await productModel.findOne({ _id: id }, { __v: 0 }).lean(); // con Lean obtenemos  objetos JavaScript en lugar de documentos Mongoose

            if (!product) throw new Error("the product not exist.");

            return product;

        } catch (error) {
            return { error: error.message };
        }

    };

    getAllProductForCategory = async (category) => {

        //devuelve campo por categoria 

        products = await productModel.aggregate([

            { $match: { category: category } } //una forma otra  es

            //{$category: {_id:'$category', products:{$push:'$$ROOT'}}} //esta forma separa todo en categorias

        ]);
        console.log(products)
        return products
    };

    getAllProductForAscDesc = async (ascDes) => {

        // Orden ascendente por el campo "price" ascDes= 1 de menor a mayor
        // Orden descendente por el campo "price" ascDes= -1 de mayor a menor

        products = await productModel.aggregate([
            {
                $sort: { price: ascDes }
            }
        ]);

       

        return products;
    };

    //-----------------------------------------------------------------------------------

    esCodeRepetido = async (code) => {
        // Verifica si el codigo de algunos de los productos de(productos.json) tiene el mismo codigo pasado.
        const products = await this.getProducts();

        const codeExiste = products.find(products => products.code === code);


        if (codeExiste) {
            console.log('error code se repite');
            return true; // se repite
        }

        return false; // no se repite;


    };

    checkEmptyObject = (object) => {
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

};

