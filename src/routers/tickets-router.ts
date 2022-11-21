import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getAllTicketsTypes, getAllTickets, createNewTicket } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getAllTicketsTypes)
  .get("/", getAllTickets)
  .post("/", createNewTicket);

export { ticketsRouter };
