import server from "./server";
import colors from "colors";

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(
    colors.cyan.bold.italic(`REST API funcionando en el puerto ${PORT}`)
  );
});
