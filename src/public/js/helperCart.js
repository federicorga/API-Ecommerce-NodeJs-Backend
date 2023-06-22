const DeleteAllProcutInCart= async (e)=>{
    const button = e.target;
    if(e.target.classList.contains("cleanCart")){
    
    
    const cid = button.dataset.custom;

    button.disabled = true;
 
    button.style.color = "gray";
    button.style.pointerEvents = "none";
    button.style.cursor = "not-allowed";
    
    const url=`/api/carts/${cid}`;
    
    const opciones={
        method:'DELETE'
    }
   
        const respuesta= await fetch(url,opciones);
        const datosRespuesta= await respuesta.json();
        console.log(datosRespuesta);
        button.disabled = false;
        button.removeAttribute("style");
    
    }else(console.log("error no posee cleanCart"))
    button.disabled = false;
    button.removeAttribute("style");
    };

    
    async function cleanCart() {
        
        let btnDeleteCart = document.querySelectorAll('.cleanCart');
    
        btnDeleteCart.forEach(btn => {
            btn.addEventListener("click", DeleteAllProcutInCart);
        });
    };

    cleanCart();