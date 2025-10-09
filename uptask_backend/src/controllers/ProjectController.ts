import type { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {
  // Método para la creación de proyectos
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);
    try {
      await project.save();
      res.send("Proyecto creado correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  // Método para obtener todos los registros de la base de datos
  static getAllProjects = async (req: Request, res: Response) => {
    res.send("Todos los proyectos");
  };
}
