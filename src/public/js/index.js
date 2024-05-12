

const socket = io(); 

/*
console.log("HOLA MUNDO"); 


socket.emit('message', "hola, es un mensaje desde el Frontend cliente");
*/




socket.on('real_time_products', data => {

    console.log(data);

    const container = document.getElementById('container');
    container.innerHTML='';

    data.products.forEach(prod => {

        renderTable(prod,container);

    });


const formRealTime=document.getElementById("formRealTime");

formRealTime.addEventListener('submit',async (e)=>{ //tocar el boton enviar en el formulario de agregar nuevo producto
    e.preventDefault();

    const formData = new FormData(formRealTime);
 
    await sendDataApiProductAdd(formData);
    formRealTime.reset();

});

const btnLimpiar=document.getElementById("btnLimpiar");

btnLimpiar.addEventListener('click',()=>{
formRealTime.reset();
const submitButton = formRealTime.querySelector(".btnEnviar");
submitButton.innerText = "Agregar";

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
  
   
    form.title.value = product.title;
    form.description.value = product.description;
    form.code.value = product.code;
    form.price.value = product.price;
    form.stock.value = product.stock;
    form.category.value = product.category;
  
    
    const submitButton = form.querySelector(".btnEnviar");
    submitButton.innerText = "Actualizar";
    submitButton.id = "btnActualizar";




    const btnLimpiar = document.getElementById("btnLimpiar");

    btnLimpiar.style.display = "inline-block";

    btnLimpiar.addEventListener("click", function() {
      
      submitButton.removeAttribute("id");
  });



  }



  async function sendDataApiProductAdd(formData) { 
    const url = '/api/products';
    const formObj = Object.fromEntries(formData.entries()); 
    const opciones = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formObj)
    };
    
    try {
      const respuesta = await fetch(url, opciones);
      const datosRespuesta = await respuesta.json();
      console.log(datosRespuesta);
      
    } catch (error) {
      console.error(error);
    }
}

async function senDataApiProductDelete(id){ 
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


  async function sendDataApiProductEdit(formData,id) { 
    const url = `/api/products/${id}`;
    const formObj = Object.fromEntries(formData.entries()); 
    const opciones = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formObj)
    };
    
    try {
      const respuesta = await fetch(url, opciones);
      const datosRespuesta = await respuesta.json();
      console.log(datosRespuesta);
      
    } catch (error) {
      console.error(error);
    }
}


