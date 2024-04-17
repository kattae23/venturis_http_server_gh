/*import { Router } from "express";
//import passport from "passport";
import jwt from "jsonwebtoken";

const verifyRouter = Router();

verifyRouter.get("/", (req, res) => {
  if (!req.session.jwt) {
    return res.status(401).json({ message: "No autorizado" });
  }
  try {
    jwt.verify(req.session.jwt, process.env.JWT_SECRET);
    res.status(200).json({ message: "Autorizado" });
  } catch (err) {
    res.status(401).json({ message: "No autorizado" });
  }
});

export default verifyRouter;
*/
