

class TicketDTO {
    async ticket(ticket) {
      let ticketParams = {
        amount: ticket.amount, //cantidad total
        purchaser: ticket.purchaser, //usuario
      
      };
      return ticketParams;
    }
  }
  
  export default TicketDTO;