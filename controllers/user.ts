import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../prisma";
import jwt from "jsonwebtoken";

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
    return res.status(200).json({
      user,
    });
  } catch (e) {
    return res.status(400).json({
      error: e,
    });
  }
};

/* User Sign in */
export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }

  const token = jwt.sign({ id: user.id }, "saket", {
    expiresIn: "1h",
  });
  user.password = "";
  res.cookie("token", token);
  return res.status(200).json(user);
};

export const signout = {};

/* MiddleWare
 * verifys JWT token
 *
 */
export const isAuthanticated = {
  /* reads jwt-token reads oAuth2 barrer token from and set's res.auth to body from token  */
  /* verify set auth property in respone to toekn */
};
