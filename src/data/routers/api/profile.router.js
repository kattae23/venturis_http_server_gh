import { Router } from "express";
import isUser from "../../../middlewares/isUser.mid.js";
import { verifytoken } from "../../../utils/token.util.js";
import User from "../../mongo/models/user.model.js";
//import crypto from 'crypto';
//import isAuth from "../../../middlewares/isAuth.mid.js";
const profileRouter = Router();

// OBTENER PERSONAJE
profileRouter.get(
  "/get_character",
  /*isAuth,*/
  isUser,
  async (req, res, next) => {
    try {
      //console.log(req.cookies)
      const token = req.cookies.token; // Obtén el token de las cookies
      const decoded = verifytoken(token); // Decodifica el token
      //console.log(decoded);
      const user_logged = decoded.username;
      //const user_db = req.user.user; // Obtenemos el usuario autenticado del token
      // Busca el usuario en la base de datos
      const userDocument = await User.findOne({ username: user_logged });
      if (!userDocument) {
        console.log("- Usuario no encontrado");
        res.status(404).json({ error: "- Usuario no encontrado" });
        return;
      }
      // Obtiene el valor del personaje del documento del usuario
      const character = userDocument.character;
      console.log("- Perfil consultado correctamente");
      res.status(200).json({ character: character });
    } catch (error) {
      console.log("- Error al obtener el perfil del usuario:", error);
      return next(error);
    }
  }
);

// ACTUALIZAR PERSONAJE
profileRouter.post(
  "/update_character",
  isUser,
  async (req, res, next) => {
    const receivedData = req.body;
    console.log("- Datos recibidos para actualizar el personaje:", receivedData);

    const token = req.cookies.token; // Obtén el token de las cookies
    const decoded = verifytoken(token); // Decodifica el token
    const user_logged = decoded.username;
    const character = receivedData.character; // El nuevo valor del personaje

    try {
      const updatedUser = await User.findOneAndUpdate({ username: user_logged }, { character: character }, { new: true });

      if (!updatedUser) {
        console.log("- Usuario no encontrado");
        res.status(404).json({ error: "- Usuario no encontrado" });
        return;
      }

      console.log("- Personaje actualizado correctamente");
      res.status(200).json({ character: character });
    } catch (err) {
      console.log("- Error actualizando el personaje:", err);
      res.status(500).json({ error: "- Error actualizando el personaje" });
    }
  }
);

// VERIFICAR TOKEN DEL USUARIO
profileRouter.get(
  "/verify_token",
  isUser,
  async (req, res) => {
    try {
      const token = req.cookies.token; // Obtén el token de las cookies
      const decoded = verifytoken(token); // Decodifica y verifica el token
      const user_logged = decoded.username;
      console.log("- Token verificado correctamente");

      // Genera un token aleatorio
      //const randomToken = crypto.randomBytes(64).toString('hex');

      // Busca el usuario en la base de datos
      const userDocument = await User.findOne({ username: user_logged });
      if (!userDocument) {
        console.log("- Usuario no encontrado");
        res.status(404).json({ error: "- Usuario no encontrado" });
        return;
      }
      // Obtiene el valor del personaje del documento del usuario
      const character = userDocument.character;
      console.log("- Perfil consultado correctamente");

      
      res.status(200).json({ message: " - Token verificado correctamente", username: user_logged, /*token: randomToken,*/ character: character });
      // Obtained username from the token, and character from the BD
    } catch (err) {
      console.log("Error verificando el token:", err);
      res.status(500).json({ error: "- Error verificando el token" });
    }
  }
);

export default profileRouter;
