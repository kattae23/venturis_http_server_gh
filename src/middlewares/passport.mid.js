import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { createUser, validateUser } from "../services/userService.js";
import { createToken } from "../utils/token.util.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        const { email, character } = req.body;
        const newUser = await createUser(username, email, password, character);
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        const user = await validateUser(username, password);
        const token = createToken({ username: user.username, role: user.role });
        req.token = token;
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;