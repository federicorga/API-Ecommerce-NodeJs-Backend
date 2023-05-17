
const socket = io(); //le decimos al front end que trabaje con socket


let user;



const chatBox=document.getElementById('chatBox');
const btnEnviar=document.getElementById('btnChatBox');
const log = document.getElementById('messageLogs'); //esta es la etiqueta p donde se van a mostrar los mensajes

Swal.fire({ // al usar el then es como una promesa
    title:'Chat-Ecommerce',
    input:'text',
    text:'ingresa el usuario para identificarte',
    inputValidator: (value)=>{
        return !value && "necesitas escribir un nombre de usuario para ingresar"
    },
    allowOutsideClick:false, // evita que de click fuera del modail
    allowEscapeKey:false //evita que se use el ESC para salir del modail
}).then(result=>{
    user=result.value; //asignamos el valor del input a el let usuer (que esta arriba)--> esto no se envia al servidor
    socket.emit('authenticated',user);
   

});




const chatFuncion=(evt)=>{// escribiendo en el chatbox lo que queremos mandar.
    if(evt.key==='Enter' || evt.target===btnEnviar){
        if(chatBox.value.trim().length >0){  //aca le decimso que la cadena es mayor a 0 es deci que no enviamos un vacio en el chatbox
            var today = new Date();
    const fechaActual = today.toLocaleString('es-Es');
            socket.emit('message',{user,fechaActual, message:chatBox.value}) //---> aqui se envia al servidor el usuario y lo demas
            
            chatBox.value=""; //limpia la barra
            
            
        }
    }
};

chatBox.addEventListener("keydown", chatFuncion);
btnEnviar.addEventListener("click",chatFuncion);






socket.on('messageLogs', async(data)=>{ //los usuarios reciben (escuchan) al servidor

let messageHTML = '';

   await data.forEach(message => {
        
       messageHTML +=`
        <span class="seccionMensaje">
                <p class="pUser">${message.user}</p>
                <p class="pMensaje">${message.message}</p>
          
        </span>`

    });

    log.innerHTML=messageHTML;

    if(log.scrollTop!==0){
        log.scrollTop = log.scrollHeight;
    }
    
});



socket.on('newUserConnect',data=>{

    Swal.fire({
        toast:true,
        position:'top-end',
        showConfirmButton: false,
        timer:3000,
        title:`Nuevo Usario Conectado: ${data}`,
        icon:"success"
    });
});





