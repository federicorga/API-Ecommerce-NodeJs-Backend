

class TicketDTO {
    async ticket(ticket) {
      let ticketParams = {
        amount: ticket.amount, 
        purchaser: ticket.purchaser,
      
      };
      return ticketParams;
    }
  }
  
  export default TicketDTO;