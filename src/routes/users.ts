import { Router } from "express";
import { User } from "../models/user.entity";

import { logger } from "../utils/logger";
import initDb from "../db";

const router = Router();

router.get("/", async (req, res) => {
	const db = await initDb();
	const user = new User();

	const allUsers = await db.em.findAll(user, {});

	logger.info(allUsers);

	res.send(allUsers);
});

router.post("/", async (req, res) => {
	res.send("Hello, World!");
});

router.use("/users", router);

export default router;
