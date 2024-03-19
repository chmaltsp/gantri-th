import { Router } from "express";
import artRoutes from "./art";
import userRoutes from "./users";

const router = Router({ mergeParams: true });

router.use("/users", userRoutes);
router.use("/art", artRoutes);

export default router;
