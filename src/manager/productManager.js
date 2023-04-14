import fs from 'fs';


export default class ProductManager {

    constructor(path) {

        this.path = path;
    }

    getProducts = async () => {

        try {

            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data); //transformamos a objetos
                return products;

            } else {
                return [];
            }

        } catch (error) {
            console.log(error);
        }

    }

    addProducts = async (title, description, price, thumbnail, code, stock) => {

        try {

            const product = {
                title,
                description,
                price: `$${price}`,
                thumbnail,
                code,
                stock,
                id: 0,
            };

            const products = await this.getProducts();


            const ProductoVacio = this.esProductoVacio(product); //true o false
            const CodeRepetido = this.esCodeRepetido(products, code); //true o false

            if (ProductoVacio || CodeRepetido) {

                return console.log("producto no agregado");

            }

            await this.generarId(products, product) //Genera la id
            products.push(product);

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))

            console.log("producto agregado a la lista");

            return;

        } catch (error) {

            console.log(error);
        }

    }


    //---------Funciones Herramientas


    generarId = (products, product) => {

        if (products.length === 0) {
            return product.id = 1;
        }

        else {
            return product.id = products[products.length - 1].id + 1;
        };

    }

    getProductById = async (id) => {
        try {
            const products = await this.getProducts();

            const producto = products.find(producto => producto.id === id);

            if (producto === undefined) {

                return console.log('producto no encontrado!')

            }

            return producto;

        } catch (error) {
            console.log(error)
        }

    }

    updateProduct = async (id, newParams) => {


        try {
            const product = await this.getProductById(id);
            let products = await this.getProducts();
            const productKey = Object.keys(product);
            const newParamsKey = Object.keys(newParams);


            if (this.comparaKeyObjetos(newParamsKey, productKey)) {

                products = products.map(product => (product.id === id) ? { ...product, ...newParams } : product);
                console.log(`producto Modificado:`);


                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
            }

        } catch (error) {
            console.log(error);

        }

    }

    deleteProduct = async (id) => {

        try {
            const products = await this.getProducts();
            const indice = products.findIndex(product => product.id === id);
            if (indice !== -1) {
                products.splice(indice, 1);
                console.log("Producto eliminado de la lista")
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))

            } else {
                console.log("el id no coincide");
            }

        } catch (error) {
            console.log(error);
        }


    }

    //--------------Herramientas de Verificacíon
    esProductoVacio = (product) => { //se verifica si alguna de las propiedades esta vacia.
        const soloValores = Object.values(product); //Retorna los valores
        const esValorIndefinido = soloValores.includes(undefined); //Verifica si se incluye undefined

        if (esValorIndefinido) {

            console.log("error, falta llenar campos");
            const entradas = Object.entries(product);
            console.log(entradas);

            return true; //esta vacio

        }

        return false; //no esta vacio

    }
    esCodeRepetido = (product, code) => { // Verifica si el codigo se repite.

        const codeExiste = product.find(product => product.code === code);


        if (codeExiste) {
            console.log('error code se repite');
            return true; // se repite
        }

        return false; // no se repite;


    }

    comparaKeyObjetos = (objetoRef, objetoComp) => {
        //si los objetos tienen diferente key(clave) no son iguales.

        for (let i = 0; i < objetoRef.length; i++) {
            const element = objetoRef[i];

            const valor = objetoComp.includes(element)

            if (!valor) {
                return false;
            }
        }

        return true;

    }

};











