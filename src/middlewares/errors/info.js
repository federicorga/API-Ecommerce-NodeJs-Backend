// Se trabaja el Mensaje de Error aqui va a estar la informacion de los errores

const userErrorInfo =(user)=>{ //esto se envia al usuario frontend
    return `One or more propieties were incomplete or not valid
    List of required properties:
    *first_name: needs to be a string, received: ${user.first_name}
    *last_name: needs to be a string, received: ${user.last_name}
    *email: needs to be a string, received: ${user.email}
    *password: needs to be a stringm received: ${user.password}`
}

const loginErrorInfo=(user)=>{
    return `invalid login for incomplete value or not value valid
    List of required proerties:
    *Email: needs to be string, received: ${user.email}
    *Password: needs to be string, received: ${user.password}`
}

const routerErrorInfo=()=>{
    return`The requested route was not found!`

}


export{
    userErrorInfo,
    loginErrorInfo,
    routerErrorInfo

}

