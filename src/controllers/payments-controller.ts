import paymentsService from "@/services/payments-service";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import { Response } from "express";

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  const { userId } = req;
  if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);
  try {
    const payment = await paymentsService.getUniquePayment(Number(ticketId));
    if (userId !== payment.Ticket.Enrollment.userId) return res.sendStatus(httpStatus.UNAUTHORIZED);
    if (!payment) return res.sendStatus(httpStatus.NOT_FOUND);
    return res.status(httpStatus.OK).send({ id: payment.id, ticketId: payment.ticketId });
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
