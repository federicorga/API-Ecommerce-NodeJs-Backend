
import TicketsRepository from "../repositories/tickets.repository.js";


const ticketsRepository=new TicketsRepository();



const getTickets= async ()=>{
    const result = await ticketsRepository.getTickets()
    return result;

};

const getTicketById =async(id)=>{
    const result= await ticketsRepository.getTicketById(id);
    return result;
};


const createTicket= async(ticket)=> {
  let result = await ticketsRepository.createTicket(ticket)
  return result;

};

const updateTicket = async(id, ticket)=>{
const result= await ticketsRepository.updateTicket(id,ticket);
return result;
};

  export{
  getTickets,
  getTicketById,
  createTicket,
  updateTicket
  };