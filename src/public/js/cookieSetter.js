
const form = document.getElementById('cookieForm');


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form);

    const obj={}

    data.forEach((value,key)=>obj[key]=value);

    fetch('/api/cookies',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{'Content-Type': 'application/json'}
    }).then(result=>result.json()).then(json=>console.log(json));

});

const getCookie=()=>{
    console.log(document.cookie); //el frontend asi obtiene las cookie mediante esta propiedad almacenada en nuestro navegador
    //esta son las cookies normales sin clave.
}