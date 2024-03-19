import { Router } from "express";
import artRoutes from "./art.js";
import userRoutes from "./users.js";

const router = Router({ mergeParams: true });

router.use("/users", userRoutes);
router.use("/art", artRoutes);

export default router;
