import paymentsRepository from "@/repositories/payments-repository";

async function getUniquePayment(id: number) {
  const payment = await paymentsRepository.findUnique(id);
  return payment;
}
async function getAllPayments() {
  const payments = await paymentsRepository.findMany();
  return payments;
}

const paymentsService = {
  getUniquePayment,
  getAllPayments,
};

export default paymentsService;
