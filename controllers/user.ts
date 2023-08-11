import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma";

/* UserSignup */
export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const hash: string = await bcrypt.hash(password, 10);

    /* Create new user */
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hash,
      },
    });
    return res.status(200).json({ user });
  } catch (e: any) {
    /* code: P2002 is when field is unique 
    and you try to put same thing in it */
    if (e.code === "P2002")
      return res
        .status(400)
        .json({ error: e, message: "account with email allready exist" });

    // Default response for error
    return res.status(400).json({
      error: e,
      message: `Coud not create user,error code ${e.code}`,
    });
  }
};

/* User Sign in */
export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // res.header["Access-Control-Allow-Credentials"] = true;
  // console.log(req);
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    // there is no user with email
    if (!user)
      return res.status(400).json({ message: "User with email doesnot exist" });

    // Comparing password
    if (!(await bcrypt.compare(password, user.password)))
      res.status(400).json({ message: "email and password do not match" });

    const token = jwt.sign({ id: user.id }, "saket", {
      expiresIn: "1h",
    });

    res.cookie("token", token);

    return res.status(200).json({
      id: user.id,
      token,
    });
  } catch (e) {
    res.status(400).json({ error: e, message: "cant find user in database" });
  }
};

export const signout = {};

/* MIDDLEWARE */

export const isAuthanticated = async (
  req: Request,
  res: Response,
  next: Function
) => {
  // const bearerHeader = req.headers["authorization"];
  // if (!bearerHeader) {
  //   return res.status(400).json({ message: "User Unauthorized please login" });
  // }

  const bearerToken = req.cookies;
  if (!bearerToken["token"]) {
    return res
      .status(400)
      .json({
        message: "Token not available , pleas login again",
        bearerToken,
      });
  }
  // const bearerToken = bearerHeader.split(" ");
  try {
    // req.auth = jwt.verify(bearerToken[1], "saket");
    req.auth = jwt.verify(bearerToken["token"], "saket");
    next();
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
};
