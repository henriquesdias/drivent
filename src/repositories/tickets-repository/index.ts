import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findMany() {
  return prisma.ticketType.findMany();
}
async function findManyTickets() {
  return prisma.ticket.findFirst({
    include: {
      TicketType: {
        select: {
          id: true,
          name: true,
          price: true,
          isRemote: true,
          includesHotel: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
}

const ticketsRepository = {
  findMany,
  findManyTickets,
};

export default ticketsRepository;
