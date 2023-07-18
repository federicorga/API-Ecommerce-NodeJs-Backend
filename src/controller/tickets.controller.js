import * as ticketService from '../services/tickets.service.js'



const getTickets= async ()=>{
    const result = await ticketService.getTickets()
    return result;

};

const getTicketById =async(id)=>{
    const result= await ticketService.getTicketById(id);
    return result;
};


const createTicket= async(ticket)=> {

  
  let result = await ticketService.createTicket(ticket)
  return result;

};

const updateTicket = async(id, ticket)=>{
const result= await ticketService.updateTicket(id,ticket);
return result;
};

export{
    getTickets,
    getTicketById,
    createTicket,
    updateTicket
    };