import { genSaltSync, hashSync, compareSync } from 'bcrypt';
export const createHash = (password: string) =>
  hashSync(password, genSaltSync(10));
export const verifyHash = (req: string, db: string) => compareSync(req, db);
