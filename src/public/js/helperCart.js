const DeleteAllProcutInCart = async (e) => {
    const button = e.target;
    if (e.target.classList.contains("cleanCart")) {

        const cid = button.dataset.custom;

        button.disabled = true;

        button.style.color = "gray";
        button.style.pointerEvents = "none";
        button.style.cursor = "not-allowed";

        const url = `/api/carts/${cid}`;

        const opciones = {
            method: 'DELETE'
        }

        const respuesta = await fetch(url, opciones);
        const datosRespuesta = await respuesta.json();

        button.disabled = false;
        button.removeAttribute("style");
        return datosRespuesta

    } else {
        console.log("error no posee cleanCart")
    }
    button.disabled = false;
    button.removeAttribute("style");
};

async function cleanCart() {
    let btnDeleteCart = document.querySelectorAll('.cleanCart');

    btnDeleteCart.forEach(btn => {
        btn.addEventListener("click", DeleteAllProcutInCart);
    });
}

async function FinishPurchase(e) {
    alert(`Compra Finalizada!`);
    const button = e.target;
    if (e.target.classList.contains("finishCart")) {

        const cid = button.dataset.custom;

        button.disabled = true;

        button.style.color = "gray";
        button.style.pointerEvents = "none";
        button.style.cursor = "not-allowed";

        const url = `/api/carts/${cid}/purchase`;
        const opciones = {
            method: 'GET'
        }

        const respuesta = await fetch(url, opciones);
        const datosRespuesta = await respuesta.json();
        button.disabled = false;

        button.removeAttribute("style");
        
      
        
        return datosRespuesta

    }

};

async function CartPurchase() {
    let btnFinish = document.querySelectorAll('.finishCart');
    btnFinish.forEach(btn => {
        btn.addEventListener("click", FinishPurchase);
    })
};

// Agregar escuchas de eventos a los botones
document.getElementById("botonLimpiarCarrito").addEventListener("click", DeleteAllProcutInCart);
document.getElementById("botonFinalizarCompra").addEventListener("click", FinishPurchase);


