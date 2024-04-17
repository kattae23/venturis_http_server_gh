import { verifytoken } from "../utils/token.util.js";

export default (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    const userData = verifytoken(token);
    if (userData) {
      return next();
    } else {
      const error = new Error("Bad auth from Auth middleware");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};