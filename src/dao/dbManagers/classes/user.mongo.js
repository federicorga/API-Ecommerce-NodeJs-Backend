import userModel from '../models/users.model.js'


export default class UserManager{
    constructor(){
        console.log("working Users with DB")
    }

    getOneUser= async (email)=>{
        const user= await userModel.findOne(email );
        return user;
        }
        
        addNewUser = async (newUser)=>{
            const result =userModel.create(newUser);
            return result;
        };
        
        updatePasswordUser= async (email,user)=>{
        const result = userModel.updateOne(email, user); //subimos la nueva contraseña hasheada
        return result
        }
        
        //const user = await userModel.findOne({email});
        
}
