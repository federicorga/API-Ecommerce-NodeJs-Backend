// implementacion de js del lado del front-end es decir del lado del cliente usando SOcket.io

const socket = io(); //import de la dependencia <script src="/socket.io/socket.io.js"></script> en index.handlebars

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
 

    await sendDataForm(formData);

});


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
            <th>${prod.id}</th>
            <th><input type="button" id="btnResta${prod.id}" value="Eliminar"></input>
        `

        container.appendChild(tr);

      
        const btnDelete = document.getElementById(`btnResta${prod.id}`);        
        btnDelete.addEventListener("click", async() => {
            await sendID(prod.id)
            
          });
    }



  async function sendDataForm(formData) {
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

async function sendID(id){
    const url = `/api/products/${id}`;
    const opciones ={
        method: 'DELETE'
    }

    try{
        const respuesta= await fetch(url,opciones);
        const datosRespuesta= await respuesta.json();
        console.log("esta es la respuesta:")
        console.log(datosRespuesta);
    }catch(error){
        console.error(error);
    }
}