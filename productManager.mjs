

class ProductManager {

    constructor() {

        this.products = [];
    }

    getProducts = () => {
        return this.products;
    }

    addProducts = (title, description, price, thumbnail, stocke, code) => {

        const product = {
            title,
            description,
            price:`$ ${price}`,
            thumbnail,
            code,
            stocke,
            id: 0
        };

        const ProductoVacio = this.esProductoVacio(product); //true o false
        const CodeRepetido = this.esCodeRepetido(this.getProducts(), code); //true o false

        if (ProductoVacio || CodeRepetido) {

            return console.log("producto no agregado");

        }

        
        this.generarId(this.getProducts(), product);

        this.products.push(product);

        console.log("producto agregado a la lista");
        return;


       
        

      
    }


    generarId = (products, product) => {

        if (products.length === 0) {
            product.id = 1;

        }

        else {
            product.id = products[products.length - 1].id + 1;

        };

    }


    getProductById = (id) => {

        const producto = this.products.find(producto => producto.id === id);

        if (producto === undefined) {

        return console.log('producto no encontrado!')

        }

        console.log('producto encontrado');
        return producto;

        
        
    }

    //--------------Verificiaciones

    esProductoVacio = (product) => { //se verifica si alguna de las propiedades esta vacia.
        const soloValores = Object.values(product);
        const esValorIndefinido = soloValores.includes(undefined);

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


};


export default ProductManager;








