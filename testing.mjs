import ProductManager from "./productManager.mjs";

const productManager=new ProductManager();





productManager.addProducts("La Renga", "Banda de Rock", 200, "img", 10, "code123");
productManager.addProducts("Los Redondos", "Banda de Rock", 400, "imgda", 110, "code1234");


//con propiedades vacias
productManager.addProducts("Soda-Stereo");


// con code repetido
productManager.addProducts("Los Piojos", "Banda de Rock", 190, "img", 10, "code123");



//muestra la lista de productos
console.log(productManager.getProducts());


//busqueda de id inexistente
console.log(productManager.getProductById(46));

//busqueda de id existente

console.log(productManager.getProductById(1));
