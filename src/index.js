import ProductManager from "./manager/productManager.js";


const manager = new ProductManager('./src/json/productos.json');


const env = async () => {

  const products = await manager.getProducts();

  console.log(products); // ARRAY VACIO


  await manager.addProducts("rock", "cualquiera21", 200, "img", 123, 10);
  await manager.addProducts("rock2", "cualquiera", 200, "img", 124, 10);
  await manager.addProducts("rock3", "cualquiera", 200, "img"); // NO SE AGREGA POR FALTA DE DATOS
  await manager.addProducts("rock4", "cualquiera", 200, "img", 124, 10); // NO SE AGREGA POR CODE REPETIDO
  await manager.addProducts("rock5", "cualquiera", 200, "img", 127, 10);
  await manager.addProducts("rock6", "cualquiera21", 200, "img", 128, 10);
  await manager.addProducts("rock7", "cualquiera", 200, "img", 129, 10);
  await manager.addProducts("rock8", "cualquiera21", 200, "img", 130, 10);
  await manager.addProducts("rock9", "cualquiera", 200, "img", 131, 10);
  await manager.addProducts("rock10", "cualquiera", 200, "img", 132, 10);
  await manager.addProducts("rock11", "cualquiera", 200, "img", 133, 10);
  await manager.addProducts("rock12", "cualquiera", 200, "img", 134, 10);

  const readProducts = await manager.getProducts();

  console.log("todos los productos:")

  console.log(readProducts);

  await manager.getProductById(21); // ID INEXISTENTE

  console.log("Producto encontrado:");

  console.log(await manager.getProductById(3)); // Existe

  await manager.updateProduct(1, { title: "ROCKMODIFICADO", stock: 40}) // MODIFICACION DE OBJETO ID 1

  await manager.deleteProduct(2); // SE ELIMINA OBJETO CON ID 2
 
  await manager.addProducts("rock5", "cualquiera", 200, "img", 29, 10); // SE AGREGA NUEVO OBJETO

  console.log("todos los productos:")

  const readProducts2 = await manager.getProducts();

  console.log(readProducts2);

}

//-----------Ejecucíon

env();

