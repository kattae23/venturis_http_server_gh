import { Router } from "express";
import apiRouter from "./api/index.router.js";

const router = Router();

router.use("/api", apiRouter);
//router.use("/", viewsRouter);

export default router;