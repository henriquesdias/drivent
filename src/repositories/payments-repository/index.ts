import { prisma } from "@/config";

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
async function create({ ticketId, value, cardIssuer, cardLastDigits }: Payment) {
  return prisma.payment.create({
    data: {
      ticketId,
      value,
      cardIssuer,
      cardLastDigits,
    },
  });
}
type Payment = {
  ticketId: number;
  value: number;
  cardIssuer: string;
  cardLastDigits: string;
};

const paymentsRepository = {
  findUnique,
  findMany,
  create,
};

export default paymentsRepository;
