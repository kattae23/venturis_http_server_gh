import { Router } from 'express';
import registerRouter from './register.router.js';
import loginRouter from './login.router.js';
import profileRouter from './profile.router.js';
//import cookiesRouter from "./cookies.router.api.js";
//import verifyRouter from './verify.router.js';

const apiRouter = Router();

apiRouter.use('/register', registerRouter);
apiRouter.use('/login', loginRouter);
apiRouter.use('/profile', profileRouter);
//apiRouter.use("/cookies", cookiesRouter);
//apiRouter.use('/verify', verifyRouter);

export default apiRouter;