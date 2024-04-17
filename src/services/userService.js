import { createHash, verifyHash } from "../utils/bcrypt.utils.js";
import User from "../data/mongo/models/user.model.js";

export async function createUser(username, email, password, character) {
  if (password.length < 8) {
    throw new Error("La contraseña debe tener al menos 8 caracteres");
  }
  if (!/[A-Z]/.test(password)) {
    throw new Error("La contraseña debe contener al menos una letra mayúscula");
  }
  if (!/[a-z]/.test(password)) {
    throw new Error("La contraseña debe contener al menos una letra minúscula");
  }
  if (!/[0-9]/.test(password)) {
    throw new Error("La contraseña debe contener al menos un número");
  }
  if (!/[!@#$%^&*]/.test(password)) {
    throw new Error("La contraseña debe contener al menos un carácter especial");
  }

  const userExists = await User.findOne({ username: username });
  if (userExists) {
    throw new Error("El nombre de usuario ya existe");
  }

  const emailExists = await User.findOne({ email: email });
  if (emailExists) {
    throw new Error("El correo electrónico ya existe");
  }

  const hashedPassword = createHash(password);
  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword,
    character,
  });
  await newUser.save();
  return newUser;
}

export async function validateUser(username, password) {
  const user = await User.findOne({ username: username });
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  if (!verifyHash(password, user.password)) {
    throw new Error("Contraseña incorrecta");
  }
  return user;
}