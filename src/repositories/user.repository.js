//todas las transformaciones de DTOs debemos manejarlas en esta capa

import { UserDAO } from "../dao/factory.js";


export default class UserRepository{
    constructor(){ //recibe el dao de memoria o mongodb
        this.dao=new UserDAO();
    }

    getOneUser = async(email) =>{
        const user= await this.dao.getOneUser(email)
         return user;
     };
    
     addNewUser = async(newUser)=>{
        const result = await this.dao.addNewUser(newUser);
        
        return result;
        
     }
    
     updatePasswordUser = async(email,user)=>{
        const result = await this.dao.updatePasswordUser(email,user);
        return result
     }

  

    
}
