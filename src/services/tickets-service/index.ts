import ticketsRepository from "@/repositories/tickets-repository";

async function getAllTicketsTypes() {
  const ticketsTypes = await ticketsRepository.findMany();
  return ticketsTypes;
}

const ticketsService = {
  getAllTicketsTypes,
};

export default ticketsService;
