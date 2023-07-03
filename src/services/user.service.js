 import { UserDAO } from "../dao/configDao.js";


 const getUser = async(email) =>{
    const user= await UserDAO.getOneUser(email)
     return user;
 };

 const addUser = async(newUser)=>{
    const result = await UserDAO.addNewUser(newUser);
    return result;
 }

 const updatePassword = async(email,user)=>{
    const result = await UserDAO.updatePasswordUser(email,user);
    return result
 }

 export{
    getUser,
    addUser,
    updatePassword
 }