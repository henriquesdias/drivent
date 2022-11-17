import ticketsRepository from "@/repositories/tickets-repository";

async function getAllTicketsTypes() {
  const ticketsTypes = await ticketsRepository.findMany();
  return ticketsTypes;
}
async function getAllTickets() {
  const tickets = await ticketsRepository.findManyTickets();
  return tickets;
}

const ticketsService = {
  getAllTicketsTypes,
  getAllTickets,
};

export default ticketsService;
