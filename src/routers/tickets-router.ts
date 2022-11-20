import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getAllTicketsTypes, getAllTickets, createNewTicket } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter.get("/types", authenticateToken, getAllTicketsTypes);
ticketsRouter.get("/", authenticateToken, getAllTickets);
ticketsRouter.post("/", authenticateToken, createNewTicket);

export { ticketsRouter };
