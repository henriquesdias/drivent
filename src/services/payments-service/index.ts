import paymentsRepository from "@/repositories/payments-repository";
import { notFoundError } from "@/errors";

async function getUniquePayment(id: number) {
  const payment = await paymentsRepository.findUnique(id);
  if (!payment) throw notFoundError();
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
