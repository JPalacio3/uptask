import mongoose from "mongoose";
import colors from "colors";
import { exit } from "node:process";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL);
    console.log(
      colors.blue.bold(
        `MongoDB conectado en: ${colors.magenta.bold(
          connection.connection.host,
        )} : ${colors.bold(connection.connection.port.toString())}`,
      ),
    );
  } catch (error) {
    console.log(
      colors.red.bold(
        `Error de conexión a la Base de Datos : ${error.message}`,
      ),
    );
    exit(1);
  }
};
