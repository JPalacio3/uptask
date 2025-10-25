import type { Request, Response } from "express";
import Task from "../models/Task";

export class TaskController {
	static createTask = async (req: Request, res: Response) => {
		try {
			const task = new Task(req.body);
			task.project = req.project.id;
			req.project.tasks.push(task.id);

			await Promise.allSettled([task.save(), req.project.save()]);
			res.send("Tarea Creada Correctamente");
		} catch (error: unknown) {
			res.status(500).json({ error: "Hubo un error al obtener las Tareas" });
		}
	};

	static getProjectsTasks = async (req: Request, res: Response) => {
		try {
			const tasks = await Task.find({ project: req.project.id }).populate(
				"project",
			);
			res.json(tasks);
		} catch (error: unknown) {
			res.status(500).json({ error: "Hubo un error al obtener las Tareas" });
		}
	};

	static getTaskById = async (req: Request, res: Response) => {
		try {
			if (req.task.project.toString() !== req.project.id.toString()) {
				const error = new Error("Acción NO Válida");
				return res.status(404).json({ error: error.message });
			}
			res.json(req.task);
		} catch (error: unknown) {
			res.status(500).json({ error: "Hubo un error al obtener las Tareas" });
		}
	};

	static updateTask = async (req: Request, res: Response) => {
		try {
			if (req.task.project.toString() !== req.project.id.toString()) {
				const error = new Error("Acción no válida");
				return res.status(403).json({ error: error.message });
			}

			// Si la validación pasa, actualizamos y guardamos
			Object.assign(req.task, req.body);
			await req.task.save();
			res.send("Tarea Actualizada Correctamente");
		} catch (error: unknown) {
			res.status(500).json({ error: "Hubo un error al Realizar la solicitud" });
		}
	};

	static deleteTask = async (req: Request, res: Response) => {
		try {
			if (req.task.project.toString() !== req.project.id.toString()) {
				const error = new Error("Acción no válida");
				return res.status(403).json({ error: error.message });
			}

			req.project.tasks = req.project.tasks.filter(
				(task) => req.task.toString() !== req.task.id.toString(),
			);
			await Promise.allSettled([req.task.deleteOne(), req.project.save()]);

			res.send("Tarea Eliminada Correctamente");
		} catch (error: unknown) {
			res.status(500).json({ error: "Hubo un error al Realizar la solicitud" });
		}
	};

	static updateStatus = async (req: Request, res: Response) => {
		try {
			const { status } = req.body;

			if (req.task.project.toString() !== req.project.id.toString()) {
				const error = new Error("Acción no válida");
				return res.status(403).json({ error: error.message });
			}

			req.task.status = status;
			await req.task.save();

			res.send("Tarea Actualizada Correctamente");
		} catch (error: unknown) {
			res.status(500).json({ error: "Hubo un error al Realizar la solicitud" });
		}
	};
}
