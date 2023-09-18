

import UsersRepository from '../repositories/user.repository.js';

const usersRepository = new UsersRepository();

const getAllUsers = async()=>{
   const users = await usersRepository.getAllUsers()
   return users
}

 const getOneUser = async(email) =>{ 
    const user= await usersRepository.getOneUser(email)
     return user;
 };

 const addNewUser = async(newUser)=>{ 
    const result = await usersRepository.addNewUser(newUser);
    return result;  
 }
 const updatePasswordUser = async(email,user)=>{
    const result = await usersRepository.updatePasswordUser(email,user);
    return result
 }

 const deleteInactiveUser= async(uid)=> {
   return await usersRepository.deleteInactiveUser(uid)
 }

 const setLastConnection = async(uid)=> {
   return await usersRepository.setLastConnection(uid)
 }



 export{
   getAllUsers, 
   getOneUser, 
   addNewUser, 
   updatePasswordUser, 
   deleteInactiveUser, 
   setLastConnection 
 }