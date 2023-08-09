import userModel from '../models/users.model.js'
import { logger } from "../../../loggers/logger.js";

export default class UserManager {
    constructor() {
        logger.info("working Users with DB")
    }

    getOneUser = async (email) => {
        const user = await userModel.findOne(email);
        return user;
    }

    addNewUser = async (newUser) => {
        const result = userModel.create(newUser);
        return result;
    };

    updatePasswordUser = async (email, user) => {
        const result = userModel.updateOne(email, user); //subimos la nueva contraseña hasheada
        return result
    }

    changeRole = async (role, userId) => {
        const user = await userModel.findById(userId);
        if (!user) throw new Error(`User not exists.`);
        
        if (role === 'admin' || role === 'user' || role === 'premium') {
            const result = await userModel.updateOne(
                { _id: userId },
                { $set: { role: role } }
            );
            return result;
        } else {
            throw new Error(`Invalid role.`);
        }
    }

    //const user = await userModel.findOne({email});



    }
