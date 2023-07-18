

import UsersRepository from '../repositories/user.repository.js';

const usersRepository = new UsersRepository();

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

 export{
   getOneUser,
   addNewUser,
   updatePasswordUser
 }