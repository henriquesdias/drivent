import { Router } from "express";
import { getPayment, createNewPayment } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const paymentsRouter = Router();

paymentsRouter.get("/", authenticateToken, getPayment);
paymentsRouter.post("/process", authenticateToken, createNewPayment);

export { paymentsRouter };
