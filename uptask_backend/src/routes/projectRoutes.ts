import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExist } from "../middleware/project";

const router = Router();

// Rutas para la creación de Proyectos
router.post(
  "/",
  body("projectName")
    .notEmpty()
    .withMessage("El Nombre del Proyecto es Obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El Nombre del Cliente es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La Descripción del Proyecto es Obligatoria"),

  handleInputErrors,
  ProjectController.createProject,
);

router.get("/", ProjectController.getAllProjects);

router.get(
  "/:id",
  param("id").isMongoId().withMessage("ID NO Válido o Inexistente"),

  handleInputErrors,
  ProjectController.getProjectById,
);

router.put(
  "/:id",
  body("projectName")
    .notEmpty()
    .withMessage("El Nombre del Proyecto es Obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El Nombre del Cliente es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La Descripción del Proyecto es Obligatoria"),

  param("id").isMongoId().withMessage("ID NO Válido o Inexistente"),

  handleInputErrors,
  ProjectController.updatedProject,
);

router.delete(
  "/:id",
  param("id").isMongoId().withMessage("ID NO Válido o Inexistente"),

  handleInputErrors,
  ProjectController.deleteProject,
);

// Rutas para la creación de Tareas
router.post(
  "/:projectId/task",
  validateProjectExist,
  TaskController.createTask,
);

export default router;
