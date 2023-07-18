import { ticketModel } from '../models/tickets.mode.js';


export default class TicketManager {
    constructor(){
        console.log('Working Tickets with DB')
    }
    getTickets= async ()=>{
        const result = await ticketModel.find();
        return result;
    
    };

    getTicketById =async(id)=>{
        const result= await ticketModel.findById(id);
        return result;
    };


  createTicket= async(ticket)=> {
    ticket.code = uuidv4();
      let result = await ticketModel.create(ticket);
      return result;
 
  };

  updateTicket = async(id, ticket)=>{
    const result= await ticketModel.findByIdAndUpdate(id,ticket);
    return result;
  };

}