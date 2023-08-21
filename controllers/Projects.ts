/* 
1. Create,read,update,delte OneProject
2. getAllProjectsForUsers
3. getProjectById

*/

import { error } from "console";
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

export const listAllProjects = async (req: Request, res: Response) => {
  const { id } = req.auth;
  // const userID = req.params["userId"];
  // if (userID !== id)
  // return res.json({ message: "userid and tokeId are not same", userID, id });
  try {
    const projects = await prisma.project.findMany({
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
      .json({ projects, message: "Projects Fetch succeesed" });
  } catch (e: any) {
    res.status(400).json({ error: e, message: "can get projects" });
  }
};

/* Save code to Datapase */
export const updateOneCode = async (req: Request, res: Response) => {
  const { html, js, css } = req.body;
  const { id } = req.auth;
  const projectid = req.params["projectid"];
  try {
    const project = await prisma.project.update({
      where: {
        id: projectid,
        userId: id,
      },
      data: {
        html,
        css,
        js,
      },
    });
    return res.status(200);
  } catch (e) {
    return res.status(400).json({ erroe: e });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  /* 
    get user & project from param
    get html,css,js from req.body
  */
  const id = req.params["projectid"];
  try {
    const project = await prisma.project.findFirst({
      where: {
        id,
      },
      select: {
        html: true,
        css: true,
        js: true,
      },
    });
    return res
      .status(200)
      .json({ message: "Succefulty loaded Project", project });
  } catch (e: any) {
    return res.status(400).json({ message: "Falid to load project", error: e });
  }
};

export const deleteOneProject = async (req: Request, res: Response) => {
  const id = req.params["id"];
  try {
    await prisma.project.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Deleted Succesfully" });
  } catch (error: any) {
    res.status(400).json({ message: "failde to delete", error: error });
  }
};
