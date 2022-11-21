import paymentsService from "@/services/payments-service";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import { Response } from "express";
import ticketsService from "@/services/tickets-service";

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  const { userId } = req;
  if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);
  try {
    const payment = await paymentsService.getUniquePayment(Number(ticketId), userId);

    return res.status(httpStatus.OK).send({
      id: payment.id,
      ticketId: payment.ticketId,
      value: payment.value,
      cardIssuer: payment.cardIssuer,
      cardLastDigits: payment.cardLastDigits,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.send(httpStatus.NOT_FOUND);
    }
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}
export async function createNewPayment(req: AuthenticatedRequest, res: Response) {
  const payment = req.body;
  const { userId } = req;
  if (!payment.cardData || !payment.ticketId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  try {
    const ticket = await ticketsService.getTicketById(payment.ticketId, userId);
    const ticketType = await ticketsService.getUniqueTicketType(ticket.ticketTypeId);
    await ticketsService.updateStatusToPaid(payment.ticketId);
    const newPayment = await paymentsService.createNewPayment(payment, ticketType.price);

    return res.status(httpStatus.OK).send(newPayment);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
