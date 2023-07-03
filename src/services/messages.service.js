import { MessagesDAO } from "../dao/configDao.js";



const getMessages=async()=>{
    const messages=MessagesDAO.getAll();
    return messages;
}

const saveMessage=async(message)=>{
    const result =MessagesDAO.save(message);
    return result;
}


export{
    getMessages,
    saveMessage
}