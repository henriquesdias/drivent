import ticketsRepository from "@/repositories/tickets-repository";

async function getAllTicketsTypes() {
  const ticketsTypes = await ticketsRepository.findMany();
  return ticketsTypes;
}
async function getAllTickets() {
  const tickets = await ticketsRepository.findManyTickets();
  return tickets;
}
async function getUniqueTicket(id: number) {
  const ticket = await ticketsRepository.getTicketById(id);
  return ticket;
}
async function createNewTicket(ticketTypeId: number, enrollmentId: number) {
  return ticketsRepository.createTicket(ticketTypeId, enrollmentId);
}

const ticketsService = {
  getAllTicketsTypes,
  getAllTickets,
  getUniqueTicket,
  createNewTicket,
};

export default ticketsService;
