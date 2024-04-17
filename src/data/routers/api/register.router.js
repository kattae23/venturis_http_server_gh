// Importo los módulos necesarios
import { Router } from "express";
import passport from "passport";

// Establezco las opciones para Passport. Estas opciones indican que no se creará una sesión y que si la autenticación falla, se pasará un error al siguiente middleware.
const options = { session: false, failWithError: true };

// Creo un nuevo router de Express. Este router manejará las rutas para el registro de usuarios.
const registerRouter = Router();

// Defino un manejador para las solicitudes POST a la ruta '/'. Este manejador se activará cuando un cliente envíe una solicitud POST a esta ruta.
registerRouter.post(
  "/",
  // Utilizo Passport para autenticar la solicitud. Passport intentará autenticar la solicitud utilizando la estrategia 'register' que he definido en otro lugar.
  passport.authenticate("register", options),
  // Este es el siguiente middleware que se ejecutará después de que Passport haya terminado de autenticar la solicitud.
  async (req, res, next) => {
    try {
      console.log("- Successful registration (user data saved on the DB)");
      // Intento enviar una respuesta al cliente con un código de estado 201 y un mensaje de 'registered'. Esta respuesta indica que el registro fue exitoso.
      return res.status(201).json({
        statusCode: 201,
        message: "registered",
      });
    } catch (error) {
      // Si ocurre un error (por ejemplo, si hubo un problema al intentar enviar la respuesta), llamo al siguiente middleware y le paso el error.
      return next(error);
    }
  },
  // Este es un middleware de manejo de errores. Se ejecutará si alguno de los middlewares anteriores llama a 'next' con un error.
  (error, req, res, next) => {
    // Envío una respuesta al cliente con un código de estado de error y un mensaje de error. Esto informa al cliente que ocurrió un error al procesar su solicitud.
    return res.status(error.statusCode || 400).json({
      statusCode: error.statusCode || 400,
      message: error.message,
    });
  }
);

// Exporto el router para que pueda ser utilizado en otros módulos de mi aplicación.
export default registerRouter;