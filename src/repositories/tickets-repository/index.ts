import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findMany() {
  return prisma.ticketType.findMany();
}

const ticketsRepository = {
  findMany,
};

export default ticketsRepository;
