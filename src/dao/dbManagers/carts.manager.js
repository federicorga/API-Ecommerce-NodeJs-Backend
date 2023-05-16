import { cartModel } from "../models/carts.model.js";
import ProductManager from "./products.manager.js";

const productManager = new ProductManager();
export default class CartsManagerDB{

    constructor(){
        console.log("Working carts with DB")
    }

    getCarts=async()=>{
        const carts=await cartModel.find().lean(); //con esto evitamos hacer el map
        return carts;
    };

    addNewCart = async () => {

        try {
           

         const cart={
            products:[]
         }

         const result = await cartModel.create(cart);
         console.log("Carrito generado");
         return result;
         

        } catch (error) {

            console.log(error);
        }

    };


    addProductInCart=async(cartId,productId)=>{

        
        const cart=await this.getCartById(cartId);
        const product= await productManager.getProductById(productId);
        
        if(cart && product){ 
            
        let isInCart=cart.products.find((item)=>item.product===productId);
        let result;
        if(isInCart){
               result = await cartModel.updateOne(
                {_id: cartId, "products.product":productId},
                {$inc:{"products.$.quantity":1}}
               )
            }else{
                result = await cartModel.updateOne(
                    {_id: cartId},
                    {$push:{products:{product:productId,quantity:1}}}
                )
            }
            return {success:`The product was added successfull in cart`,
            payload: result};
        };
    };
              

            
   

    getCartById=async(id)=>{
    try {

        let cart = await cartModel.findOne({_id:id}, {__v:0}).lean(); //el __V se utiliza como una proyección para indicar qué campos deseas excluir de los resultados de la consulta.

        if (!cart) throw new Error("the product not exist.");

        return cart;
        
      } catch (error) {
        return{error:error.message};
      }
          
};
}