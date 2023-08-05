import bodyParser from "body-parser";

import express, { Request, Response } from "express";
import prisma from "./prisma";
const app = express();

app.use(bodyParser.json());
import userRoutes from "./routes/user";

app.use("/api/user", userRoutes);

// get no. of uesrs
app.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.count();
  res.json({ message: `${req.body.name}Num,ber of users are ${users}` });
});

app.listen(3001);
