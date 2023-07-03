import { messageModel } from "./models/messages.model.js"

export default class MessagesManagerDB{

    constructor(){
        console.log("Working message with DB")
    }

    getAll=async()=>{
        const messages=await messageModel.find().lean(); //con esto evitamos hacer el map
        return messages;
    }

    save=async(message)=>{
        const result = await messageModel.create(message);
        return result;
    }

}