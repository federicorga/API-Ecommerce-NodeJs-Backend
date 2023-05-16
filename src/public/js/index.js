// implementacion de js del lado del front-end es decir del lado del cliente usando SOcket.io

const socket = io(); //import de la dependencia <script src="/socket.io/socket.io.js"></script> en index.handlebars

console.log("HOLA MUNDO"); //escribe en la consola de mi navegador,

//enviar mensaje al servidor desde el cliente
socket.emit('message', "hola, es un mensaje desde el Frontend cliente");

//escuchar mensaje individual del servidor

socket.on('evento_socket_individual', data=>{ //recibimos evento del servidor que solo lo ven los nuevos usuarios y lo mostramos en consola.
    console.log(data);
});

socket.on('evento_todos_menos_actual', data=>{ //recibimos un evento del servidor que solo ven los usuarios conectados y mostramos en consola.
    console.log(data);})

socket.on('evento_todos', data=>{ //recibimos un evento del servidor que lo ven todos los clientes.
        console.log(data);
});



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
 

    await enviarDatos(formData);

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
            await enviarID(prod.id)
            
            
          });
    }



  async function enviarDatos(formData) {
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

async function enviarID(id){
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