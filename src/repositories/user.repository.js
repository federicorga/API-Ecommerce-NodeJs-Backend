
import { UserDAO } from "../dao/factory.js";


export default class UserRepository{
    constructor(){ 
        this.dao=new UserDAO();
    }

    getAllUsers= async()=>{
        const users = await this.dao.getAllUsers()
      
        return users
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

     deleteInactiveUser= async(uid)=> {
        return await this.dao.deleteUser(uid)
      }

      setLastConnection = async(uid)=> {
        return await this.dao.setLastConnection(uid)
      }

     
  

    
}
