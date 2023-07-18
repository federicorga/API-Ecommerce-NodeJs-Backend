import { TicketsDAO } from "../dao/factory.js";
import { TICKET_DTO } from "../DTOs/DTOManager.js";

export default class TicketsRepository{
    constructor(){
        this.dao= new TicketsDAO();
    }
    getTickets= async ()=>{
        const result = await this.dao.getTickets()
        return result;
    
    };

    getTicketById =async(id)=>{
        const result= await this.dao.getTicketById(id);
        return result;
    };


  createTicket= async(ticket)=> {
    const ticketFormat = await TICKET_DTO.ticket(ticket);
      let result = await this.dao.createTicket(ticketFormat)
      return result;
 
  };

  updateTicket = async(id, ticket)=>{
    const result= await this.dao.updateTicket(id,ticket);
    return result;
  };

}