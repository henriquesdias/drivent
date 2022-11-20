import { Router } from "express";
import { getPayment } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const paymentsRouter = Router();

paymentsRouter.get("/", authenticateToken, getPayment);

export { paymentsRouter };
