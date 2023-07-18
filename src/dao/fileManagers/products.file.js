import fs from 'fs';



export default class ProductManager {

    constructor(path) { //path es camino es decir que se debe especificar el archivo

        this.path = path;
        console.log ('Working products whit File')
    }

    getAllProducts = async () => {

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

    addAllProducts = async (product) => {

        try {
            const products = await this.getAllProducts();
            const checkLenght=this.checkLenghtObject(product);
            const codeRepetido = await this.esCodeRepetido(product.code);
            const checkInvalidKey=this.checkInvalidKey(product); 
            
            console.log(product);

            product ={
                title:product.title,
                description:product.description,
                code:product.code,
                price: `$${product.price}`,
                status:product.status??true,
                stock:product.stock,
                category:product.category,
                thumbnails:product.thumbnails??[]
            };

            const checkEmpty=this.checkEmptyObject(product);
            
            console.log(checkLenght)
            console.log(codeRepetido )
            console.log(checkEmpty)
            console.log(checkInvalidKey)

            console.log(product);

      
            if (checkLenght||codeRepetido || checkEmpty ||checkInvalidKey) {
                 console.log("producto no agregado");
                return "producto no agregado";
            }
//-----------------------------------------------------------------------------------
     

         
            await this.generarId(products, product) //Genera la id
            
            products.push(product);

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))

            console.log("producto agregado a la lista");

            return "producto agregado a la lista";

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
            const products = await this.getAllProducts();

            const producto = products.find(producto => producto.id === id);

            if (producto === undefined) {

                return console.log('producto no encontrado!')

            }

            return producto;

        } catch (error) {
            console.log(error)
        }

    }

    updateOneProduct = async (id, newParams) => {


        try {
            const product = await this.getProductById(id);
            let products = await this.getAllProducts();
            const productKey = Object.keys(product);
            const newParamsKey = Object.keys(newParams);
            console.log(productKey);
            console.log(newParams);
            if (this.comparaKeyObjetos(newParamsKey, productKey)) {

                products = products.map(product => (product.id === id) ? { ...product, ...newParams } : product);
                console.log(`producto Modificado`);


                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
                return "modificado";
            }

        } catch (error) {
            console.log(error);

        }

    }

    deleteOneProduct = async (id) => {

        try {
            const products = await this.getAllProducts();
            const indice = products.findIndex(product => product.id === id);
            if (indice !== -1) {
                products.splice(indice, 1);
                console.log("Producto eliminado de la lista")
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                return "producto Eliminado de la Lista";

            } else {
                console.log("el id no coincide");
            }

        } catch (error) {
            console.log(error);
        }


    }

    //--------------Herramientas de Verificacíon
 
    checkLenghtObject=(object)=>{
        //verifica si el largo del objeto pasado es el correcto.
        if(Object.keys(object).length <=8) return false; //el largo es el correcto.    

        return true; //El largo supera lo correcto.

    }

    checkEmptyObject=(object)=>{
        //verifica si el valor de algun elemento del objeto es vacio(indefinido,etc).
        for(const key in object){
            if(object[key]===""||
            object[key]===undefined||
            object[key]===null ||
            object[key]===false)
            return true; //el objeto posee elementos vacios o falsos.
        }

        return false; //el objeto no posee elemento vacios o falsos.
    }

    checkInvalidKey=(object)=>{
       //Verifica si dentro del objeto pasado se encuentra una clave que no cumple.
       //El objeto pasado es comparado con valido(array).
        const validos =["title","description","code","price","status","stock","category","thumbnails"];
        const keyObject=Object.keys(object);

        const arrayKeys= [...new Set([...validos, ...keyObject])];
        for (let i = 0; i < arrayKeys.length; i++) {
            if(!validos.includes(arrayKeys[i])){
                console.log(arrayKeys[i]);
                return true; //Encontro una clave que no cumple.
            }   
        }
        return false;
    }



   

    comparaKeyObjetos = (objetoRef, objetoComp) => {
        //si los objetos tienen diferente key(clave) no son iguales.
        //objetoRef es nuevos parametros, objetoComp es al que se compara
        //compara objeto existente con objeto pasado

        for (let i = 0; i < objetoRef.length; i++) {
            const element = objetoRef[i];

            const valor = objetoComp.includes(element)
            if (!valor) {
                return false;
            }
        }

        return true;

    }

    esCodeRepetido = async(code) => { 
        // Verifica si el codigo de algunos de los productos de(productos.json) tiene el mismo codigo pasado.
        const products = await this.getAllProducts();

        const codeExiste = products.find(products => products.code === code);


        if (codeExiste) {
            console.log('error code se repite');
            return true; // se repite
        }

        return false; // no se repite;


    }

};











