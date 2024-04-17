import jwt from "jsonwebtoken";

function createToken(data) {
  const token = jwt.sign(data, process.env.SECRET, {
    expiresIn: 60,
  });
  return token;
}

// I expect an object that contains the HTTP headers from the request
function verifytoken(token) {
  if (token) {
    try {
      const data = jwt.verify(token, process.env.SECRET);
      return data;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
  const error = new Error("bad auth token");
  error.statusCode = 401;
  throw error;
}

export { createToken, verifytoken };
