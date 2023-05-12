import express from "express";
import cors from "cors";
import controller from "./controllers/user.controller.js";

const app = express();

//necesario para poder recibir datos en json
app.use(express.json());
app.use(cors());

// Enrutamos el controlador de usuarios a la ruta /api/usuarios
app.use('/api/usuarios', controller);
//  Arranque del servidor
const port = 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`))