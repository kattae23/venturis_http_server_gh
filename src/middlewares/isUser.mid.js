import { verifytoken } from "../utils/token.util.js";

export default (req, res, next) => {
  try {
    //console.log("isUser.mid:", req.cookies)
    const token = req.cookies.token;
    //console.log(token);
    const data = verifytoken(token);
    const { role } = data; // Destructure the role from the data
    if (role === 0) {
      return next();
    } else {
      const error = new Error("Forbidden");
      error.statusCode = 403;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
