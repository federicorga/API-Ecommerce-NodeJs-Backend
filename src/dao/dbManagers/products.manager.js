import { productModel } from "../models/products.models.js";


export default class ProductsManagerDB{
    constructor(){
        console.log("working products whit DB")
    }

    getProducts=async()=>{

        const products = await productModel.find();
        return products.map(product=>product.toObject());
    }

    addProducts=async(product)=>{
        

  
        const codeRepetido = await this.esCodeRepetido(product.code);
      
        
        console.log(product);

        const checkEmpty=this.checkEmptyObject(product);
  
        if (codeRepetido || checkEmpty) {
             console.log("producto no agregado");
            return "producto no agregado";
        }

        const result= await productModel.create(product);

        console.log("producto agregado a la lista");

        return result;

    };

    updateProduct=async(id,product)=>{
       
        const result = await productModel.updateOne({ _id:id }, product);
        return result
    };


    deleteProduct = async (id) => {
        const result = await productModel.deleteOne({ _id: id });
        return result

    };
        
    //-----------------------------------------------------------------------------------


    esCodeRepetido = async(code) => { 
        // Verifica si el codigo de algunos de los productos de(productos.json) tiene el mismo codigo pasado.
        const products = await this.getProducts();

        const codeExiste = products.find(products => products.code === code);


        if (codeExiste) {
            console.log('error code se repite');
            return true; // se repite
        }

        return false; // no se repite;


    };

    getProductById = async (id) => {
      try {

        let product = await productModel.findOne({_id:id}, {__v:0}).lean();

        if (!product) throw new Error("the product not exist.");

        return product;
        
      } catch (error) {
        return{error:error.message};
      }
           

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


    };