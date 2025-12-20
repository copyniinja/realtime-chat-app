import cors from "cors";
import express, { Request, Response } from "express";

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

// Status
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
});

export default app;
