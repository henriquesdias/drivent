import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getAllTicketsTypes, getAllTickets } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter.get("/types", authenticateToken, getAllTicketsTypes);
ticketsRouter.get("/", authenticateToken, getAllTickets);

export { ticketsRouter };
