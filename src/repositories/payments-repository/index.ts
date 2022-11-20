import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findUnique(id: number) {
  return prisma.payment.findFirst({
    where: {
      id,
    },
    include: {
      Ticket: {
        include: {
          Enrollment: {
            select: {
              userId: true,
            },
          },
        },
      },
    },
  });
}
async function findMany() {
  return prisma.payment.findMany();
}

const paymentsRepository = {
  findUnique,
  findMany,
};

export default paymentsRepository;
