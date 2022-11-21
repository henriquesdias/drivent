import { Router } from "express";
import { getPayment, createNewPayment } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const paymentsRouter = Router();

paymentsRouter.all("/*", authenticateToken).get("/", getPayment).post("/process", createNewPayment);

export { paymentsRouter };
