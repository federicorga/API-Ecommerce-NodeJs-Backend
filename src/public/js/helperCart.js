const DeleteAllProcutInCart= async (e)=>{
    const button = e.target;
    if(e.target.classList.contains("addToCart")){
    
    
    const pid= e.target.dataset.id;

    button.disabled = true;
 
    button.style.color = "gray";
    button.style.pointerEvents = "none";
    button.style.cursor = "not-allowed";
    
    const url=`/api/carts/646bd8f1a9e2cb824885cd40/product/${pid}`;
    
    const opciones={
        method:'POST'
    }
   
        const respuesta= await fetch(url,opciones);
        const datosRespuesta= await respuesta.json();
        console.log(datosRespuesta);
        button.disabled = false;
        button.removeAttribute("style");
    
    }else(console.log("error no posee addToCart"))
    button.disabled = false;
    button.removeAttribute("style");
    };
    
    
    async function addCart() {
        
        let btnsAddCart = document.querySelectorAll('.addToCart');
    
        btnsAddCart.forEach(btn => {
            btn.addEventListener("click", enviarDatosCart);
        });
    }