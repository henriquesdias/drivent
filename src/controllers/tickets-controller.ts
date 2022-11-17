import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import httpStatus from "http-status";
import { Response } from "express";

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
