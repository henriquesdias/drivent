import ticketsRepository from "@/repositories/tickets-repository";
import { notFoundError, unauthorizedError } from "@/errors";

async function getAllTicketsTypes() {
  const ticketsTypes = await ticketsRepository.findMany();
  return ticketsTypes;
}
async function getAllTickets() {
  const tickets = await ticketsRepository.findManyTickets();
  if (!tickets) throw notFoundError();
  return tickets;
}
async function getUniqueTicket(id: number) {
  const ticket = await ticketsRepository.getTicketById(id);
  if (!ticket) throw notFoundError();
  return ticket;
}
async function createNewTicket(ticketTypeId: number, enrollmentId: number) {
  return ticketsRepository.createTicket(ticketTypeId, enrollmentId);
}
async function getUniqueTicketType(id: number) {
  return ticketsRepository.findFirst(id);
}
async function getTicketById(id: number, userId: number) {
  const ticket = await ticketsRepository.findFirstTicket(id);
  if (!ticket) throw notFoundError();
  if (ticket.Enrollment.userId !== userId) throw unauthorizedError();
  return ticket;
}
async function updateStatusToPaid(id: number) {
  return ticketsRepository.update(id);
}

const ticketsService = {
  getAllTicketsTypes,
  getAllTickets,
  getUniqueTicket,
  createNewTicket,
  getUniqueTicketType,
  getTicketById,
  updateStatusToPaid,
};

export default ticketsService;
