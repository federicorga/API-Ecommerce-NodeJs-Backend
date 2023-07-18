import fs from 'fs';
import ProductManager from '../manager/productManager.js';


const productManager = new ProductManager('./src/json/productos.json');

export default class CartManager{

    constructor(path){
        this.path = path;
        console.log('Working Carts with File')
    }


    getAllCarts = async () => {

        try {

            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const carts = JSON.parse(data); //transformamos a objetos
                return carts;

            } else {
                return [];
            }

        } catch (error) {
            console.log(error);
        }

    }

    addNewCart = async () => {

        try {
           
            const carts = await this.getAllCarts();

         const cart={
            products:[]
         }
         
            await this.generarIdCart(carts, cart) //Genera la id
            
            carts.push(cart);

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))

            console.log("Carrito generado");

            return "Carrito Creado";

        } catch (error) {

            console.log(error);
        }

    }

    addOneProductInCart=async(cartId,productId)=>{

        const carts = await this.getAllCarts();
        const productById = await productManager.getProductById(productId); 
        carts.forEach((cart)=>{
        if(cart.id === cartId && productById.id===productId){
            
            let isInCart=cart.products.find((item)=>item.product===productId)

            if(isInCart){
                cart.products.forEach(item => {
                    if(item.product===productId)item.quantity++;
                    return item;
                  
                });

            }else{
                cart.products.push({product:productById.id, quantity:1});
            }
            }
        });
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));

            }
   



        


    


    generarIdCart = (carts, cart) => {

        if (carts.length === 0) {
            return cart.id = 1;
        }

        else {
            return cart.id = carts[carts.length - 1].id + 1;
        };

    }

    getCartById = async (id) => {
        try {
            const carts = await this.getAllCarts();

            const cart = carts.find(cart => cart.id === id);

            if (cart === undefined) {

                return console.log('Carrito no encontrado!')

            }

            return cart;

        } catch (error) {
            console.log(error)
        }

    }


}