import { messageModel } from "../models/messages.model.js"
import { logger } from "../../../loggers/logger.js";
export default class MessagesManager {

    constructor() {
        logger.info("Working message with DB")
    }

    getMessages = async () => {
        const messages = await messageModel.find().lean();
        return messages;
    }

    saveMessage = async (message) => {
        const result = await messageModel.create(message);
        return result;
    }

}