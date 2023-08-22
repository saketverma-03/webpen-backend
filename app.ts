import bodyParser from "body-parser";

import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import prisma from "./prisma";
import projectRouter from "./routes/project";
import userRoutes from "./routes/user";
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
     origin: "https://master.d3ncw9mhvwljc2.amplifyapp.com",
   // origin: true,
   // credentials: true,
    // " Access-Control-Allow-Origin": true
  })
);

app.use("/api/user", userRoutes);
app.use("/api/projects", projectRouter);
// get no. of uesrs
app.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.count();
  res.json({ message: `${req.body.name}Num,ber of users are ${users}` });
});

app.listen(3001, () => console.log("serverStarted at port 3001"));
