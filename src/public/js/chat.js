
const socket = io();


let user;



const chatBox = document.getElementById('chatBox');
const btnEnviar = document.getElementById('btnChatBox');
const log = document.getElementById('messageLogs');

Swal.fire({
    title: 'Chat-Ecommerce',
    input: 'text',
    text: 'ingresa el usuario para identificarte',
    inputValidator: (value) => {
        return !value && "necesitas escribir un nombre de usuario para ingresar"
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then(result => {
    user = result.value;
    socket.emit('authenticated', user);


});




const chatFuncion = (evt) => {
    if (evt.key === 'Enter' || evt.target === btnEnviar) {
        if (chatBox.value.trim().length > 0) {
            var today = new Date();
            const fechaActual = today.toLocaleString('es-Es');
            socket.emit('message', { user, fechaActual, message: chatBox.value })

            chatBox.value = "";


        }
    }
};

chatBox.addEventListener("keydown", chatFuncion);
btnEnviar.addEventListener("click", chatFuncion);






socket.on('messageLogs', async (data) => {

    let messageHTML = '';

    await data.forEach(message => {

        messageHTML += `
        <span class="seccionMensaje">
                <p class="pUser">${message.user}</p>
                <p class="pMensaje">${message.message}</p>
          
        </span>`

    });

    log.innerHTML = messageHTML;

    if (log.scrollTop !== 0) {
        log.scrollTop = log.scrollHeight;
    }

});



socket.on('newUserConnect', data => {

    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: `Nuevo Usario Conectado: ${data}`,
        icon: "success"
    });
});





