import { Router } from "express";
import { User } from "../models/user.entity.js";

import initDb from "../db.js";
import asyncHandler from "express-async-handler";

const router = Router({ mergeParams: true });

router.get(
	"/",
	asyncHandler(async (req, res, next) => {
		const db = await initDb();

		const allUsers = await db.em.findAll(User);

		res.status(200).json(allUsers);
	}),
);

router.post(
	"/",
	asyncHandler(async (req, res) => {
		if (!req.body.name || !req.body.age || !req.body.location) {
			res.status(400).json({ message: "Invalid request" });
			return;
		}
		const db = await initDb();

		const user = new User();

		user.name = req.body.name;
		// Could get away without converting to int, but it's good practice
		user.age = parseInt(req.body.age);
		user.location = req.body.location;

		await db.em.persistAndFlush(user);

		res.status(200).json(user);
	}),
);

export default router;
