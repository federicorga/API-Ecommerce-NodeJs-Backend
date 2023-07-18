import { messageModel } from "../models/messages.model.js"

export default class MessagesManager{

    constructor(){
        console.log("Working message with DB")
    }

    getMessages=async()=>{
        const messages=await messageModel.find().lean(); //con esto evitamos hacer el map
        return messages;
    }

    saveMessage=async(message)=>{
        const result = await messageModel.create(message);
        return result;
    }

}