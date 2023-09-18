import userModel from '../models/users.model.js'
import { logger } from "../../../loggers/logger.js";

export default class UserManager {
  constructor() {
    logger.info("working Users with DB")
  }

  getAllUsers = async () => {
    const users = await userModel.find().lean();
    return users
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
    const result = userModel.updateOne(email, user);
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
  setLastConnection = async (uid) => {
    try {
      let result = await userModel.updateOne(
        { _id: uid },
        { $set: { last_connection: new Date().toISOString() } }
      );
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }


  deleteUser = async (uid) => {
    try {
      let result = await userModel.deleteOne({ _id: uid })
      return result
    } catch (error) {
      return { error: error.message };
    }
  }



}
