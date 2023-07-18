import MessagesRepository from "../repositories/messages.repository.js";

const messagesRepository=new MessagesRepository();
 
const getMessages=async()=>{
    const messages=messagesRepository.getMessages();
    return messages;
}

const saveMessage=async(message)=>{
    const result =messagesRepository.saveMessage(message);
    return result;
}


export{
    getMessages,
    saveMessage
}