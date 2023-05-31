



const enviarDatosCart= async (e)=>{

    if(e.target.classList.contains("addToCart")){
    
    const pid= e.target.dataset.id;
    
    const url=`/api/carts/646bd8f1a9e2cb824885cd40/product/${pid}`;
    
    const opciones={
        method:'POST'
    }
   
        const respuesta= await fetch(url,opciones);
        const datosRespuesta= await respuesta.json();
        console.log(datosRespuesta);
    
    
    }else(console.log("estoy haciendo clic"))
    
    };
    
    
    async function addCart(){
    
        let btnAddCart = document.querySelector('.product');   

        btnAddCart.addEventListener("click", enviarDatosCart);
    };
    
addCart();