import cors from "cors";
import express, { Request, Response } from "express";

const app = express();

// Middlewares
app.use(cors());

// Status
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
});

export default app;
