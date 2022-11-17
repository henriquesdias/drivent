import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getAllTicketsTypes } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter.get("/types", authenticateToken, getAllTicketsTypes);

export { ticketsRouter };
