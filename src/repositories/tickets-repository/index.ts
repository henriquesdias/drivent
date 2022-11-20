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
async function getTicketById(id: number) {
  return prisma.ticket.findFirst({
    where: {
      TicketType: {
        id,
      },
    },
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
async function createTicket(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: "RESERVED",
    },
  });
}

const ticketsRepository = {
  findMany,
  findManyTickets,
  getTicketById,
  createTicket,
};

export default ticketsRepository;
