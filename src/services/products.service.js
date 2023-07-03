//(2) importamos de config el DAO ya instanciado
import { PRODUCTSDAO } from "../dao/configDao.js";


const getProducts = async() =>{
   const products= await PRODUCTSDAO.getAllProducts();
    return products;
}

const getProductsOrganized = async(limit,page,query,sort)=>{
    const products = await PRODUCTSDAO.getAllProductsOrganized(limit,page,query,sort);
    return products;
}

const addProducts = async (newProduct) => {
const product= await PRODUCTSDAO.addAllProducts(newProduct);
return product;
};

const updateProduct = async (id, product) => {

    const result = await PRODUCTSDAO.updateOneProduct(id,product);
    return result;
};

const deleteProduct = async (id) => {
    const result = await PRODUCTSDAO.deleteOneProduct(id);
    return result;

};
const getProductId = async (id) => {
    const product = await PRODUCTSDAO.getProductById(id);
    return product;

};

const getProductsForCategory = async (category) => {

    const result = await PRODUCTSDAO.getAllProductForCategory(category);
    return result;

};

const getProductForAscDesc = async (ascDes) => {
    const result = await PRODUCTSDAO.getAllProductForAscDesc(ascDes);
    return result;
};


export{
getProducts,
getProductsOrganized,
addProducts, 
updateProduct, 
deleteProduct, 
getProductId,
getProductsForCategory,
getProductForAscDesc
}