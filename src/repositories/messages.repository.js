import { MessagesDAO } from "../dao/factory.js";


export default class MessagesRepository{
    constructor(){ 
        this.dao=new MessagesDAO();
    }

    getMessages=async()=>{
        const messages=this.dao.getMessages();
        return messages;
    }
    
    saveMessage=async(message)=>{
        const result =this.dao.saveMessage(message);
        return result;
    }

}