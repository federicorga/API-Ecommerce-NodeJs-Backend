// implementacion de js del lado del front-end es decir del lado del cliente usando SOcket.io

const socket = io(); //import de la dependencia <script src="/socket.io/socket.io.js"></script> en index.handlebars

console.log("HOLA MUNDO"); //escribe en la consola de mi navegador,

//enviar mensaje al servidor desde el cliente
socket.emit('message', "hola, es un mensaje desde el Frontend cliente");

//escuchar mensaje individual del servidor


socket.on('real_time_products', data => {

    console.log(data);

    const container = document.getElementById('container');
    container.innerHTML='';

    data.products.forEach(prod => {

        renderTable(prod,container);

    });


const formRealTime=document.getElementById("formRealTime");

formRealTime.addEventListener('submit',async (e)=>{
    e.preventDefault();

    const formData = new FormData(formRealTime);
 
    await sendDataApiProductAdd(formData);
    formRealTime.reset();

});

const btnLimpiar=document.getElementById("btnLimpiar");

btnLimpiar.addEventListener('click',()=>{
formRealTime.reset();
const submitButton = formRealTime.querySelector(".btnEnviar");
submitButton.innerText = "Enviar";

})


});

function renderTable (prod,container){
    
    const tr = document.createElement("tr");

    tr.innerHTML += `
        
            <th>${prod.title}</th>
            <th>${prod.description}</th>
            <th>${prod.code}</th>
            <th>${prod.price}</th>
            <th>${prod.status}</th>
            <th>${prod.stock}</th>
            <th>${prod.category}</th>
            <th>${prod._id}</th>
            <th>
            <input type="button" id="btnResta${prod._id}" value="Eliminar"></input>
            <input type="button" id="btnEdit${prod._id}" value="Editar"></input>
            </th>
            
        `
        container.appendChild(tr);
      
        const btnDelete = document.getElementById(`btnResta${prod._id}`);        
        btnDelete.addEventListener("click", async() => {
            await senDataApiProductDelete(prod._id)
            
          });

          const btnEdit = document.getElementById(`btnEdit${prod._id}`);
          btnEdit.addEventListener("click", () => {
          fillFormWithProductData(prod);
    });
  };


  function fillFormWithProductData(product) {
    const form = document.getElementById("formRealTime");
  
    // Llena los campos del formulario con los datos del producto
    form.title.value = product.title;
    form.description.value = product.description;
    form.code.value = product.code;
    form.price.value = product.price;
    form.stock.value = product.stock;
    form.category.value = product.category;
  
    // Cambia el texto del botón de enviar a "Actualizar"
    const submitButton = form.querySelector(".btnEnviar");
    submitButton.innerText = "Actualizar";


    const btnLimpiar = document.getElementById("btnLimpiar");

    btnLimpiar.style.display = "inline-block";
  }



  async function sendDataApiProductAdd(formData) { //envia dato al api/products metodo: Post
    const url = '/api/products';
    const formObj = Object.fromEntries(formData.entries());  //Transforma la clave valor del forumlario en un objeto Javascript ya que lo que sale del formulario es un objeto del tipo FormData
    const opciones = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // es un tipo MIME estándar utilizado para indicar que el contenido del mensaje o solicitud HTTP está en formato JSON.
      body: JSON.stringify(formObj) //Transforma objeto a formato JSON
    };
    
    try {
      const respuesta = await fetch(url, opciones);
      const datosRespuesta = await respuesta.json();
      console.log(datosRespuesta);
      
    } catch (error) {
      console.error(error);
    }
}

async function senDataApiProductDelete(id){ //envia dato al api/products metodo: Delete
    const url = `/api/products/${id}`;
    const opciones ={
        method: 'DELETE',
    }

    try{
        const respuesta= await fetch(url,opciones);
        const datosRespuesta= await respuesta.json();
        console.log(datosRespuesta);
    }catch(error){
        console.error(error);
    }
}





