import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

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

export default router;
