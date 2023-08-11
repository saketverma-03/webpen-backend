/* 
1. Create,read,update,delte OneProject
2. getAllProjectsForUsers
3. getProjectById

*/

import { Request, Response } from "express";
import { title } from "process";
import prisma from "../prisma";

/* Create ProjeCt */
export const createOneProject = async (req: Request, res: Response) => {
  const { project } = req.body;
  const { id } = req.auth;
  // const userID = req.params["userId"];

  try {
    const newProject = await prisma.project.create({
      data: {
        userId: id,
        title: project.title,
      },
    });

    return res.status(200).json({ newProject, message: " testing cuccesss" });
  } catch (e: any) {
    res.status(400).json({ error: e, message: "cant create" });
  }
};

export const getProjectsList = async (req: Request, res: Response) => {
  const { id } = req.auth;
  const userID = req.params["userId"];
  if (userID !== id)
    return res.json({ message: "userid and tokeId are not same", userID, id });
  try {
    const porjects = prisma.project.findMany({
      where: {
        userId: id,
      },
      select: {
        title: true,
        id: true,
      },
    });
    return res
      .status(200)
      .json({ porjects, message: "Projects Fetch succeesed" });
  } catch (e: any) {
    res.status(400).json({ error: e, message: "can get projects" });
  }
};

/* Save code to Datapase */
export const updateProjectCode = async (req: Request, res: Response) => {
  /* 
    get user & project from param
    get html,css,js from req.body
  */
};
