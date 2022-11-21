import { prisma } from "@/config";

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
async function findFirst(id: number) {
  return prisma.ticketType.findFirst({
    where: {
      id,
    },
  });
}
async function findFirstTicket(id: number) {
  return prisma.ticket.findFirst({
    where: {
      id,
    },
    include: {
      Enrollment: {
        select: {
          userId: true,
        },
      },
    },
  });
}
async function update(id: number) {
  return prisma.ticket.update({
    where: { id },
    data: {
      status: "PAID",
    },
  });
}

const ticketsRepository = {
  findMany,
  findManyTickets,
  getTicketById,
  createTicket,
  findFirst,
  findFirstTicket,
  update,
};

export default ticketsRepository;
