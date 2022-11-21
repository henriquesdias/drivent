import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { notFoundError, unauthorizedError } from "@/errors";

async function getUniquePayment(id: number, userId: number) {
  const ticket = await ticketsRepository.findFirstTicket(id);
  if (!ticket) throw notFoundError();
  if (ticket.Enrollment.userId !== userId) {
    throw unauthorizedError();
  }
  const payment = await paymentsRepository.findUnique(id);

  return payment;
}
async function getAllPayments() {
  const payments = await paymentsRepository.findMany();
  return payments;
}
async function createNewPayment(
  payment: { ticketId: number; cardData: { issuer: string; number: number } },
  value: number,
) {
  const { ticketId, cardData } = payment;

  return paymentsRepository.create({
    ticketId,
    value,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(11),
  });
}

const paymentsService = {
  getUniquePayment,
  getAllPayments,
  createNewPayment,
};

export default paymentsService;
