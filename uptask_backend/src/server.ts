import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRoutes";

dotenv.config();
connectDB();
const app = express();

// Habilitar la lectura de formatos de archivos tipo JSON
app.use(express.json());

// app.use("/api/auth");
app.use("/api/projects", projectRoutes);

export default app;
