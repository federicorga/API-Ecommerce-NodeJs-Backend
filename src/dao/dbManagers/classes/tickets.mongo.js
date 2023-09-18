import { ticketModel } from '../models/tickets.mode.js';
import { logger } from "../../../loggers/logger.js";
import { v4 as uuidv4 } from 'uuid';
export default class TicketManager {
  constructor() {
    logger.info('Working Tickets with DB')
  }
  getTickets = async () => {
    const result = await ticketModel.find();
    return result;

  };

  getTicketById = async (id) => {
    const result = await ticketModel.findById(id);
    return result;
  };


  createTicket = async (ticket) => {
    ticket.code = uuidv4();
    let result = await ticketModel.create(ticket);
    return result;

  };

  updateTicket = async (id, ticket) => {
    const result = await ticketModel.findByIdAndUpdate(id, ticket);
    return result;
  };

}