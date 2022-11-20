import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import httpStatus from "http-status";
import { Response } from "express";
import enrollmentsService from "@/services/enrollments-service";

export async function getAllTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketsTypes = await ticketsService.getAllTicketsTypes();

    return res.status(httpStatus.OK).send(ticketsTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getAllTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const tickets = await ticketsService.getAllTickets();
    if (!tickets) return res.sendStatus(httpStatus.NOT_FOUND);

    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function createNewTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;
  const { userId } = req;
  if (!ticketTypeId) return res.sendStatus(httpStatus.BAD_REQUEST);
  try {
    const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
    // if (!enrollment) return res.sendStatus(httpStatus.NOT_FOUND);
    await ticketsService.createNewTicket(ticketTypeId, enrollment.id);
    const tickets = await ticketsService.getUniqueTicket(Number(ticketTypeId));

    return res.status(httpStatus.CREATED).send(tickets);
  } catch (error) {
    if (error.message === "No result for this search!") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
