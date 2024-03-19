import { Router } from "express";
import artRoutes from "./art";
import userRoutes from "./users";

const router = Router();

router.use("/users", userRoutes);
router.use("/art", artRoutes);

export default router;
