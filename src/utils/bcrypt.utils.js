import { genSaltSync, hashSync, compareSync } from "bcrypt";
const createHash = (password) => hashSync(password, genSaltSync(12));
const verifyHash = (req, db) => compareSync(req, db);
export { createHash, verifyHash };