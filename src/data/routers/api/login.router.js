import { Router } from "express";
import passport from "passport";

const options = { session: false, failWithError: true };
const loginRouter = Router();

loginRouter.post(
  "/",
  passport.authenticate("login", options),
  async (req, res, next) => {
    try {
      // Envio de respuesta de inicio de sesión exitoso
      return res
        .cookie("token", req.token, { maxAge: 60000, httpOnly: true}) // The cookies are aleady part of the request object
        // No need to send the cookies on the headers, they part of the body of the request by default
        .status(200)
        .json({
          statusCode: 200,
          message: "Successful login!",
        });
    } catch (error) {
      console.log("Error en el inicio de sesión:", error);
      return next(error);
    }
  },
  (error, req, res, next) => {
    console.log("Error en el middleware de manejo de errores:", error);
    return res.status(error.statusCode || 400).json({
      statusCode: error.statusCode || 400,
      message: error.message,
    });
  }
);

export default loginRouter;